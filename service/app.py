from chalice import Chalice, Response
from urllib.parse import urlencode
from bs4 import BeautifulSoup
import requests
import uuid
from collections import namedtuple
from fuzzywuzzy import process

PageResult = namedtuple('PageResult', ['uuid', 'link', 'title', 'description'])

def get_group_result(result):
    return {
        'uuid': str(uuid.uuid4()),
        'link': result.find('a')['href'].replace('..', ''),
        'title': result.find('a').text,
        'description': result.findNext('dd').text,
    }


def get_page_result(result):
    return {
        'uuid': str(uuid.uuid4()),
        'link': result.find('a')['href'].replace('..', ''),
        'title': result.find('a').text,
        'description': result.findNext('dd').text,
    }


def convert_page_result_to_object(page_dict):
    return PageResult(
        uuid=page_dict['uuid'],
        link=page_dict['link'],
        title=page_dict['title'],
        description=page_dict['description'],
    )


def get_event_result(result):
    description = result.find(class_='event_description')
    location = result.find(class_='event_location')
    time = result.find(class_='event_time')

    return {
        'uuid': str(uuid.uuid4()),
        'link': result.find('a')['href'].replace('..', ''),
        'title': result.find('a').text,
        'description': description.text if description else None,
        'location': location.text if location else None,
        'time': time.text if time else None,
    }


def get_news_result(result):
    anchor = result.select_one('h5 a')
    image = result.select_one('.news_image img')

    return {
        'uuid': str(uuid.uuid4()),
        'link': anchor['href'].replace('..', ''),
        'title': anchor.text.replace('&nbsp;', ' '),
        'description': result.find(class_='leader').text,
        'image': image['src'] if image else None,
    }


def get_results_for_term(term, document):
    groups = [get_group_result(result) for result in document.select('.search_groupings dt')]
    pages = [get_page_result(result) for result in document.select('.search_pages dt')]
    events = [get_event_result(result) for result in document.select('.search_events .event')]
    news = [get_news_result(result) for result in document.select('.search_news .news_item')]

    all_unsorted = groups + pages + events + news
    results_map = {item['uuid']:item for item in all_unsorted}
    title_map = {item['title']:item['uuid'] for item in all_unsorted}

    fuzz_sorted = process.extract(term, title_map.keys(), limit=15)

    return {
        'results': results_map,
        'groups': [item['uuid'] for item in groups],
        'news': [item['uuid'] for item in news],
        'pages': [item['uuid'] for item in pages],
        'events': [item['uuid'] for item in events],
        'top': [title_map[fuzz_result[0]] for fuzz_result in fuzz_sorted],
    }

app = Chalice(app_name='kings-search-service')
app.debug = True

@app.route('/')
def index():
    term = app.current_request.query_params['q']

    q = {
        'q': term
    }
    req = requests.get(f'https://www.kclsu.org/search/?{urlencode(q)}')

    document = BeautifulSoup(req.text)

    return Response(get_results_for_term(term, document), headers={'Access-Control-Allow-Origin':'*'})


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#

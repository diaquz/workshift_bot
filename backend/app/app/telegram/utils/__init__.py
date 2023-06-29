
def get_message_data(message):
    return message['from']['id'], message['message_id'], message['chat']['id'], message['text']

import re

class Callback:
    def __init__(self, name: str, data: dict) -> None:
        self.name = name
        self.data = data


    def pack(self):
        result = self.name
        for value in self.data.values():
            result += f":{value}"

        return result
    
    @staticmethod
    def unpack(query: str):
        data = re.findall(r'([^:]+)', query)

        return data
            




from sqlalchemy.ext.declarative import as_declarative, declared_attr, declarative_base
import typing

# class_registry: typing.Dict = {}

# @as_declarative(class_registry = class_registry)
# class Base:
#     id: typing.Any
#     __name__: str

#     @declared_attr
#     def __tablename__(cls) -> str:
#         return cls.__name__.lower()

Base = declarative_base()

from setuptools import setup, find_packages


setup(
    name = 'django-yandexmaps',
    version = '0.1.dev',
    author = 'Anikin Sergey',
    author_email = 'anikin@trilan.ru',
    description = 'Yandex maps constructor for django-admin',
    packages = find_packages(),
    include_package_data=True,
    zip_safe = False,
)

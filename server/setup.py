from setuptools import setup, find_packages
from pathlib import Path

setup(
    name="PolicyEngine-Core",
    version="0.1.3",
    author="PolicyEngine",
    license="http://www.fsf.org/licensing/licenses/agpl-3.0.html",
    url="https://github.com/policyengine/policyengine-core",
    install_requires=[
        "plotly",
        "flask",
        "flask_cors",
        "kaleido",
        "google-cloud-storage>=1.42.0",
        "gunicorn",
        "OpenFisca-Core",
        "microdf_python",
        "numpy",
        "pandas",
        "tables",
    ],
    packages=find_packages(),
)
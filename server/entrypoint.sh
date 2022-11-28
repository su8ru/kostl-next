#!/bin/bash
set -e

yarn migrate:deploy

exec yarn start

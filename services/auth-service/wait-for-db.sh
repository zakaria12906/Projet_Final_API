#!/bin/sh
# Source: https://github.com/eficode/wait-for

set -e

host="$1"
shift
cmd="$@"

until nc -z $host 3306; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Database is up - executing command"
exec $cmd
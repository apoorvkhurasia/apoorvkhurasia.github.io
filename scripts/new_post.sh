#!/usr/bin/env zsh

title=""
date=""
tags_csv=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --title)  title="$2";     shift 2 ;;
    --date)   date="$2";      shift 2 ;;
    --tags)   tags_csv="$2";  shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

if [[ -z "$title" ]]; then
  echo "Usage: $0 --title <title> [--date YYYY-MM-DD] [--tags tag1,tag2,...]" >&2
  exit 1
fi

date="${date:-$(date +%Y-%m-%d)}"

# Validate date format
if [[ ! "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "Error: date must be in YYYY-MM-DD format" >&2
  exit 1
fi

# Slugify title: lowercase, replace spaces/special chars with hyphens, collapse hyphens
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr -s ' _' '-' | tr -cd 'a-z0-9-' | sed 's/^-//;s/-$//')

# Build tags YAML array: "tag1,tag2" -> "[tag1, tag2]"
if [[ -n "$tags_csv" ]]; then
  tags_yaml="[$(echo "$tags_csv" | sed 's/,/, /g')]"
else
  tags_yaml="[]"
fi

outfile="$(dirname "$0")/../_posts/${date}-${slug}.md"

if [[ -e "$outfile" ]]; then
  echo "Error: file already exists: $outfile" >&2
  exit 1
fi

cat > "$outfile" <<EOF
---
title: "$title"
date: $date
tags: $tags_yaml
---
EOF

echo "Created: $outfile"

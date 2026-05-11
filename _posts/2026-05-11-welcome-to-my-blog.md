---
title: "Welcome to My Blog"
date: 2026-05-11 12:00:00 +0000
tags: [meta]
---

Welcome to my blog. I'm starting this space to write about software engineering, technology, and the ideas that show up in my work.

## What to Expect

Posts here will be about things I've found worth writing down — patterns that work well, lessons learned the hard way, tools or techniques worth knowing about. Some posts will be short and focused; others longer explorations of a topic.

## How This Works

The blog is built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages. Posts are written in Markdown and deployed automatically when I push to the repository.

To add a new post, I just create a file like `_posts/YYYY-MM-DD-title.md` with front matter:

```markdown
---
title: "My Post Title"
date: 2026-05-15
tags: [tag1, tag2]
---

Post content goes here...
```

That's it. Push, and the post is live.

## A Code Sample

Here's a simple example in Python to make sure syntax highlighting is working:

```python
def fibonacci(n: int) -> list[int]:
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

More posts coming soon.

# Refreshing News (data/news.json)
The News page shows ONLY posts from @HiAlphaTerminal and @TheMrX (other handles are ignored by the page).
1. Search original posts with the X `search_posts_all` tool, one query per handle:
   `from:HiAlphaTerminal -is:retweet -is:reply` and `from:TheMrX -is:retweet -is:reply`.
2. Keep up to ~15 newest. Each item: {handle: "@HiAlphaTerminal"|"@TheMrX", date (ISO UTC), summary (1 line, no price claims), url (https://x.com/<handle>/status/<id>)}.
3. Real posts and real URLs only. If a handle has no items, the page shows "No posts yet" for it.
4. Set "updated" to the current time with +05:30, then commit and push.

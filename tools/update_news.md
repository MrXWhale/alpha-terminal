# Refreshing Official News (data/news.json)
1. Collect official X handles: the `links.x` values in data/airdrops.json and data/upcoming.json, plus @HiAlphaTerminal.
2. Search recent original posts, for example with the X `search_posts_all` tool:
   `(from:HiAlphaTerminal OR from:variational_io OR from:quipnetwork OR ...) -is:retweet -is:reply` with start_time set 7 days back.
3. For each newsworthy post, add an item: {project, handle, date (ISO UTC), category: TGE|Mint|Airdrop|Update, summary (1-2 lines, no price claims), url (https://x.com/<handle>/status/<id>)}.
4. Keep only real posts with real URLs. Remove items older than about 30 days.
5. Set "updated" to the current time with its offset (+05:30), then commit and push. The page sorts newest first automatically.

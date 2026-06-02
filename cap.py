from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    def log_console(msg):
        print('CONSOLE', msg.type, msg.text)
    page.on('console', log_console)
    page.on('pageerror', lambda err: print('PAGEERROR', str(err)[:200]))
    
    try:
        page.goto('http://127.0.0.1:8765/', wait_until='domcontentloaded', timeout=10000)
        import time
        time.sleep(5)
        page.screenshot(path='/Users/zhuanz1mima0000/Library/Application Support/AirJelly/sessions/be074dbb-f708-4efd-ba93-905f7ef72eac/suimesh-site/preview.png', full_page=False)
        print('SCREENSHOT_OK')
    except Exception as e:
        print('FAILED:', type(e).__name__, str(e)[:300])
    browser.close()

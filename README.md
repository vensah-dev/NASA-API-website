# [NASA-gram](https://vensah.dev/NASA-API-website/)
I wanted to do my own spin on the NASA API projects by making it scroll infinitely like Instagram or a social media app in general. You can scroll through and check out some images, hover over it for the date and click on it for even more info.

The rationale, is to make it fun and engaging to look through these pictures, and one good way is to have an infinitely scrolling page with randomly loaded images which is a great way to check out the pictures NASA has without having to think of a specific date and input it.

Currently the main part is that its an MVP that has all the functionality woking well already. The images load 3 at a time by fetching the image and storing it into an img object to preload and then display 3 at a time, based on how far the user scrolls. This means they can scroll forever (until i reach the rate limit per hour lol) and see random new images from NASA.

In a future devlog i plan to add in features like a like button, a share button, a button to get a high res download, support for youtube video embeds and change the UI to feel more Social Media-ish

### Goals:

- Preloading of images ✅
- Infinite scroll ✅
- Social media like UI ➖
- Like, share buttons
- ability to look for pictures from specific dates


# Current Time TV animation automation for After Effects

This script automates everyday routine tasks for animation artists. It streamlines file import, animation properties, text field population and other tasks. Even a person with zero After Effects knowledge can obtain broadcast ready elements for their news report with it.

## Usage

The perfect scenario is achieved if you have two image media files (or PDF). This way the resulting animation is much richer and engaging. Adding a quote is also going to make the animation to look much better.

For a social media quote:

-   FOREGROUND: a screenshot of a social media post itself
-   BACKGROUND: a long vertical screenshot of a profile page of the author of the quote

For a press-release or a document:

-   FOREGROUND: a PDF or image file of the document itself
-   BACKGROUND: a long vertical screenshot of a website of an organization's website

If the media that contains the desired quote if of bad quality or it's visual appeal is lacking in some way (perhaps it was just a WhatsApp message) user can resort to single layer animation and just use some suiting image and a quote box.

### Notice on binary strings

A lot of encoded binary strings contain image placeholders. These are used for previewing animation before hitting Start. The preview window saves time so that you don't have to commit to starting the script's inner workings if unsure. In a fast-paced TV production this may save a lot of time and nerves.

One of the strings contains Colorama effect .ffx file which can not be coded using conventional scripting for After Effects. The script unpacks the Colorama.ffx to the user's desktop folder, applies it in After Effects and erases it from the Desktop.

### Resources

Creating this script was made possible thanks to amazing tutorials of Nate Lovell from NTProductions. Nate, thank you very much!
Nate's YouTube: https://www.youtube.com/@NTProductions
Nate's Github: https://github.com/NTProductions

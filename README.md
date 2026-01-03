# Current Time TV Animation Automation for After Effects

This script automates everyday routine tasks for animation artists. It streamlines file import, animation properties, text field population, and other repetitive tasks. Even someone with zero After Effects knowledge can produce broadcast-ready elements for news reports using this tool.

## Usage

The optimal result is achieved when you have two image media files (or PDFs). This approach produces a much richer and more engaging animation. Adding a quote will further enhance the visual appeal.

### For a social media quote:

-   **FOREGROUND:** A screenshot of the social media post itself
-   **BACKGROUND:** A long vertical screenshot of the author's profile page

### For a press release or document:

-   **FOREGROUND:** A PDF or image file of the document itself
-   **BACKGROUND:** A long vertical screenshot of the organization's website

If the media containing the desired quote is of poor quality or lacks visual appeal (perhaps it's just a WhatsApp message), you can use a single-layer animation with a suitable image and a quote box instead.

Adding audio makes the quote box close when the audio file ends.

## Notice on Binary Strings

Many encoded binary strings contain image placeholders. These are used for previewing the animation before clicking Start. The preview window saves time by allowing you to review the animation without committing to the script's full execution. In fast-paced TV production environments, this can save considerable time and stress.

One of the strings contains a Colorama effect .ffx file, which cannot be generated using conventional After Effects scripting. The script unpacks Colorama.ffx to the user's Desktop folder, applies it in After Effects, and then deletes it from the Desktop.

## Resources

Creating this script was made possible thanks to the amazing tutorials by Nate Lovell from NTProductions. Nate, thank you very much!

-   Nate's YouTube: https://www.youtube.com/@NTProductions
-   Nate's GitHub: https://github.com/NTProductions

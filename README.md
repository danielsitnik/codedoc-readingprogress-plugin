# codedoc-readingprogress-plugin
This plugin adds a progress bar to the top of your [Codedoc](https://codedoc.cc) documents. The progress bar extends itself to show the reading progress of the current document.

## :package: Installation
Using the Codedoc CLI, run the following command inside your project's folder:

```bash
$ codedoc install codedoc-readingprogress-plugin
```

## :gear: Configuration
To use the plugin, first edit your `config.ts` file like below. Make sure you import the plugin at the top of the file, and then add it to the `plugins` section in the `configuration` function.

```ts
import { configuration } from '@codedoc/core';
import { readingProgressPlugin } from 'codedoc-readingprogress-plugin' // --> import the plugin
import { theme } from './theme';

export const config = /*#__PURE__*/configuration({
    theme,
    // other properties removed for brevity
    plugins: [
        readingProgressPlugin()   // --> make sure you add this section
    ]
});
```

## :art: Customizing the Appearance
The appearance of the progress bar can be changed by passing a `ReadingProgressOptions` object to the `readingProgressPlugin()` function.

You can change the height and the colors of the progress bar for Codedoc's light and dark mode. If you supply two colors, the progress bar will be rendered with a nice gradient effect.

```ts
// imports removed for brevity
export const config = /*#__PURE__*/configuration({
    theme,
    // other properties removed for brevity
    plugins: [
        readingProgressPlugin({
            height: 6,
            lightMode: {
                primaryColor: '#FDD819',
                secondaryColor: '#E80505'
            },
            darkMode: {
                primaryColor: '#FFF720',
                secondaryColor: '#3CD500'
            }
        })
    ]
});
```

None of these options are mandatory, but if you add `lightMode` or `darkMode`, then you __must__ supply at least the `primaryColor`. If you supply the `secondaryColor`, the progress bar will be gradient, otherwise the secondary color will be the same as the primary color.

Below is a reference of the supported options:

| Option                   |  Type  | Required | Description                                        |  Default Value |
|:-------------------------|:------:|:--------:|:---------------------------------------------------|:--------------:|
| height                   | number |    No    | The height of the progress bar (in pixels).        |        5       |
| lightMode                | object |    No    |                                                    |                |
| lightMode.primaryColor   | string |    Yes   | The primary color of the bar when in light mode.   |     #1eb2a6    |
| lightMode.secondaryColor | string |    No    | The secondary color of the bar when in light mode. | = primaryColor |
| darkMode                 | object |    No    |                                                    |                |
| darkMode.primaryColor    | string |    Yes   | The primary color of the bar when in dark mode.    |     #1eb2a6    |
| darkMode.secondaryColor  | string |    No    | The secondary color of the bar when in dark mode.  | = primaryColor |

### Choosing Gradients
This is a list of websites where you can find and create nice gradients:
- [Grabient](https://www.grabient.com/)
- [Coolhue](https://webkul.github.io/coolhue/)
- [Gradient Hunt](https://gradienthunt.com/)
- [WebGradients](https://webgradients.com/)

## :book: Usage
There's nothing else to be done. You just add the plugin and the progress bar will show up on every page! :smiley:

## :sparkles: Contributing
If you'd like to contribute to this plugin, here are some ideas for improvements:

- The bar is just a `div` and the current animation is done by changing its `width` property. I read that this is a CPU intensive task that causes the browser to do a lot of repaints. I wonder if it's possible to do it with CSS transforms (like `scaleX`) instead.

- Right now the bar is shown for every document, but it's not really necessary on small documents that don't cause a lot of scrolling. There could be an option to set a minimum size and the bar would be hidden in smaller documents.

- Codedoc has a nice and smooth transition effect when switching between light and dark modes, but unfortunately CSS gradients do not support it! Fortunately, [this article](https://keithjgrant.com/posts/2017/07/transitioning-gradients) by Keith Grant suggests a nice trick to do it. Maybe we could change the implementation to use it.

## :tada: Acknowledgements
This plugin was based on this [Pen](https://codepen.io/tutsplus/pen/QWGJxPo) implementation by [Envato Tuts+](https://tutsplus.com).

## :unlock: License
[MIT](https://choosealicense.com/licenses/mit/)
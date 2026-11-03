# Xavier Capdevila — personal website

[Visit the website](https://xcapdevila.github.io/)

A personal website about software architecture, engineering leadership and product thinking, with selected projects and an interactive illustration of gradual circuit-breaker recovery.

## Local preview

No dependency installation or build step is needed. From the repository root:

```sh
python3 -m http.server 4321 --bind 127.0.0.1
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321) in your browser. Stop the server with `Ctrl+C`.

## Editing

- `index.html`: content, links and metadata.
- `styles.css`: the Edition visual design and responsive layouts.
- `refinement.css`: screenshot framing and navigation on narrow screens.
- `recovery.js`: the recovery policy illustration; it does not generate real traffic.
- `site.js`: the container-command copy control.
- `assets/festival-landing.jpg`: the product landing-page screenshot.

The website uses system fonts and has no third-party runtime scripts, analytics or external font requests.

## Publication

GitHub Pages serves the root of the `gh-pages` branch, with `.nojekyll` disabling Jekyll processing. Merging a change into that branch triggers the standard Pages deployment. There is no custom build workflow or generated publication branch.

Before publication, check JavaScript syntax:

```sh
node --check recovery.js
node --check site.js
```

Also review the local page at desktop and mobile widths, the internal navigation, project links, recovery controls and command copying. The illustration deliberately keeps `HALF_OPEN` at the 100% target until the final healthy phase is advanced.

## License and history

The existing [license notice](LICENSE) is preserved.

The previous résumé implementation was based on [Miguel Ángel Durán’s minimalist portfolio](https://github.com/midudev/minimalist-portfolio-json), [Bartosz Jarocki’s CV design](https://github.com/BartoszJarocki/cv) and the [JSON Resume schema](https://jsonresume.org/schema/). That implementation and its attribution remain in the repository history; Edition replaces its application code and assets.

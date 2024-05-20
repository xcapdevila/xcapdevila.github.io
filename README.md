# xcapdevila.github.io

This is a personal site powered by GitHub Pages.

**Note**: The `master` branch contains the "compiled" site, i.e., the built static files that are served by GitHub Pages. The source code resides in the `gh-pages` branch.

## Development Workflow

This project uses a specific workflow for development and deployment. Follow these steps:

1. **Checkout the `gh-pages` branch**: This is the main branch where the source code resides. Start by checking out this branch.

    ```bash
    git checkout gh-pages
    ```

2. **Create a new feature branch**: When you want to add a new feature or make changes, create a new branch off of `gh-pages`.

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Develop**: Make your changes in this new feature branch.

4. **Open a Pull Request**: Once you've made your changes, push your feature branch to GitHub and open a Pull Request from your feature branch to the `gh-pages` branch.

    ```bash
    git push origin feature/your-feature-name
    ```

    Then, go to the GitHub website and open a new Pull Request.

5. **Merge the Pull Request**: After review, merge your Pull Request into the `gh-pages` branch. This branch is used by GitHub Pages to deploy the website.

6. **Wait for GitHub Actions to automatically publish the web**: After the Pull Request is merged, a GitHub Actions workflow will automatically build and publish your changes to the website. You don't need to do anything during this step, just wait for the workflow to complete.

Please follow these steps for every change you make to ensure that the website is updated correctly.
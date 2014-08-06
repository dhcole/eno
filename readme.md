# eno

An inline editor for `gh-pages` sites. 


## Setup

Eno edits `gh-pages` sites by looking for  `data` attributes that identify the path to the source file on GitHub as well as any yaml front-matter variables.

**Source post:** Add a `data-path` attribute to your markup to specify a source file on Github. For example, `<html data-path="{{page.path}}">`

**Data fields:** Identify Jekyll-style front matter fields in your markup with a `data-field` attribute. For example, `<h1 data-field="title">{{ page.title }}</h1>`. Data fields are scoped to the parent `data-path` so you can edit multiple posts on a single page, such as headlines on a landing page.

**Content field:** Specify body content of a post with `data-field="content"`. This will load the source content into the element. For instance, if your post content is in `markdown`, this field will allow you to edit markdown that will render to html when the editor loses focus.

**About filenames:** Jekyll will use a filename to set the `title` and `date` for a post. To keep things simple, don't depend on these. Instead explicitly set `title` and `date` in the front matter of each post.

todo

- filename title and date values (don't use them)
- `site` fields
- ~~use Liquid templating~~
- ~~disable contentEditable formatting options, format contentEditor (monospace, remove breaks)~~
- test multiple post layouts
- ~~default content~~
- ~~format dates~~

# mqwidth-to-class.js

Add `min-width`, `max-width`, `not-min-width`, and `not-max-width` classes to the `<html>` tag based on the client's width.

This was made to be used with [PostCSS mqwidth-to-class plugin](https://github.com/notacouch/postcss-mqwidth-to-class) 
for large stylesheets in IE8, avoiding problems with having to proxy or otherwise use Respond.js, watching content go from unstyled to styled.

## Examples

To adjust breakpoints, see the end of mqwidth-to-class.js:
```javascript
(function( w, breakpoints ){

// [...]

})(this, [768, 992, 1200]); // adjust array of breakpoints here (currently based on Bootstrap)
```

```html
<!DOCTYPE html>
<!--[if IE 6]><![endif]-->
<!--[if IE 8]>         <html lang="en" class="no-js ie ie8 l-ie9 min-width-768px min-width-992px min-width-1200px"> <![endif]-->
<!--[if IE 9]>         <html lang="en" class="no-js ie ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>

<!--[if lt IE 9]>
	<link href="stylesheet-processed-by-postcss-mqwidth-to-class.css" media="screen" rel="stylesheet" type="text/css" />
	<script src="mqwidth-to-class.js"></script>
<![endif]-->
<!--[if gt IE 9 | !IE]><!-->
    <link href="stylesheet.css" media="screen" rel="stylesheet" type="text/css" />
<!--<![endif]-->
```

## Credit

This is a butchered fork of Scott Jehl's [Respond.js](https://github.com/scottjehl/Respond).

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
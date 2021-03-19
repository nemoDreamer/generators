# `@nemodreamer/generators`

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Procedural generators, for games and fake data.

<!-- cspell:disable -->
<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [API](#api)
  * [Modules](#modules)
  * [Functions](#functions)
  * [helpers](#helpers)
  * [helpers/random](#helpersrandom)
  * [@nemodreamer/generators](#nemodreamergenerators)
  * [names/createName ⇒ String](#namescreatename-%E2%87%92-string)
  * [names](#names)
  * [LANGUAGES : enum](#languages--enum)
  * [getRandom(arr) ⇒ any](#getrandomarr-%E2%87%92-any)
  * [getRange(min, max) ⇒ Number](#getrangemin-max-%E2%87%92-number)
  * [doProbability(p) ⇒ Boolean](#doprobabilityp-%E2%87%92-boolean)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- cspell:enable -->

## API

<!-- cspell:disable -->
<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=src/**/*.js&heading-depth=3&separators=true&global-index-format=dl&module-index-format=dl&property-list-format=list&member-index-format=list) -->
### Modules

<dl>
<dt><a href="#module_@nemodreamer/generators.module_helpers">helpers</a></dt>
<dd></dd>
<dt><a href="#module_helpers/random">helpers/random</a></dt>
<dd></dd>
<dt><a href="#module_@nemodreamer/generators">@nemodreamer/generators</a></dt>
<dd></dd>
<dt><a href="#module_names/createName">names/createName</a> ⇒ <code>String</code></dt>
<dd><p>Creates a name in a given language.</p>
<p>&quot;Languages&quot; are approximations based on basic combination &quot;rules&quot; of selected
vowels/consonants.</p>
</dd>
<dt><a href="#module_@nemodreamer/generators.module_names">names</a></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#getRandom">getRandom(arr)</a> ⇒ <code>any</code></dt>
<dd></dd>
<dt><a href="#getRange">getRange(min, max)</a> ⇒ <code>Number</code></dt>
<dd></dd>
<dt><a href="#doProbability">doProbability(p)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
</dl>

<a name="module_@nemodreamer/generators.module_helpers"></a>

### helpers

* * *

<a name="module_helpers/random"></a>

### helpers/random

* * *

<a name="module_@nemodreamer/generators"></a>

### @nemodreamer/generators

* * *

<a name="module_names/createName"></a>

### names/createName ⇒ <code>String</code>
Creates a name in a given language.

"Languages" are approximations based on basic combination "rules" of selected
vowels/consonants.

**Returns**: <code>String</code> - A clean, fully (potentially separated/accented) name.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>Object</code> |  |  |
| [config.min] | <code>Number</code> | <code>1</code> | Minimum number of syllables. |
| [config.max] | <code>Number</code> | <code>3</code> | Maximum number of syllables. |
| [config.language] | [<code>LANGUAGES</code>](#LANGUAGES) |  | The language of the name. If not specified, a language will be picked at random. |
| [config.debug] | <code>Boolean</code> |  | Return additional information. |


* * *

<a name="module_@nemodreamer/generators.module_names"></a>

### names

* * *

<a name="LANGUAGES"></a>

### LANGUAGES : <code>enum</code>
Language of generated name

**Kind**: global enum  
**Read only**: true  
**Properties**

- DEFAULT <code>String</code>  
- RANDOM <code>String</code>  
- NORDIC <code>String</code>  
- LATIN <code>String</code>  
- GOBLIN <code>String</code>  
- MOLE <code>String</code>  
- SPIDER <code>String</code>  
- BIBO <code>String</code>  


* * *

<a name="getRandom"></a>

### getRandom(arr) ⇒ <code>any</code>
**Kind**: global function  
**Returns**: <code>any</code> - Random element from input array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;any&gt;</code> | Input array. |


* * *

<a name="getRange"></a>

### getRange(min, max) ⇒ <code>Number</code>
**Kind**: global function  
**Returns**: <code>Number</code> - A random number between `min` and `max` (including).  

| Param | Type |
| --- | --- |
| min | <code>Number</code> | 
| max | <code>Number</code> | 


* * *

<a name="doProbability"></a>

### doProbability(p) ⇒ <code>Boolean</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>Number</code> | Probability as float between 0-1. |


* * *


<!-- AUTO-GENERATED-CONTENT:END -->
<!-- cspell:enable -->

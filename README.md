# `@nemodreamer/generators`

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Procedural generators, for games and fake data.

<!-- cspell:disable -->
<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [API](#api)
  * [Modules](#modules)
  * [helpers](#helpers)
  * [random](#random)
  * [generators](#generators)
  * [names](#names)
  * [LANGUAGES : enum](#languages--enum)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- cspell:enable -->

## API

<!-- cspell:disable -->
<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=src/**/*.js&heading-depth=3&separators=true&global-index-format=dl&module-index-format=dl&property-list-format=list&member-index-format=list) -->
### Modules

<dl>
<dt><a href="#module_generators.module_helpers">helpers</a></dt>
<dd></dd>
<dt><a href="#module_helpers.module_random">random</a></dt>
<dd></dd>
<dt><a href="#module_generators">generators</a></dt>
<dd></dd>
<dt><a href="#module_generators.module_names">names</a></dt>
<dd></dd>
</dl>

<a name="module_generators.module_helpers"></a>

### helpers

* * *

<a name="module_helpers.module_random"></a>

### random

* [random](#module_helpers.module_random)
    * [.getRandom](#module_helpers.module_random.getRandom) ⇒ <code>any</code>
    * [.getRange](#module_helpers.module_random.getRange) ⇒ <code>Number</code>
    * [.doProbability](#module_helpers.module_random.doProbability) ⇒ <code>Boolean</code>


* * *

<a name="module_helpers.module_random.getRandom"></a>

############# random.getRandom ⇒ <code>any</code>
**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)  
**Returns**: <code>any</code> - Random element from input array.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>[ &#x27;Array&#x27; ].&lt;any&gt;</code> | Input array. |


* * *

<a name="module_helpers.module_random.getRange"></a>

############# random.getRange ⇒ <code>Number</code>
**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)  
**Returns**: <code>Number</code> - A random number between `min` and `max` (including).  

| Param | Type |
| --- | --- |
| min | <code>Number</code> | 
| max | <code>Number</code> | 


* * *

<a name="module_helpers.module_random.doProbability"></a>

############# random.doProbability ⇒ <code>Boolean</code>
**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>Number</code> | Probability as float between 0-1. |


* * *

<a name="module_generators"></a>

### generators

* * *

<a name="module_generators.module_names"></a>

### names

* [names](#module_generators.module_names)
    * [.createName(config)](#module_generators.module_names.createName) ⇒ <code>String</code>
        * [.LANGUAGES](#module_generators.module_names.createName.LANGUAGES) : [<code>LANGUAGES</code>](#LANGUAGES)


* * *

<a name="module_generators.module_names.createName"></a>

############# names.createName(config) ⇒ <code>String</code>
Creates a name in a given language.

"Languages" are approximations based on basic combination "rules" of selected
vowels/consonants.

**Kind**: static method of [<code>names</code>](#module_generators.module_names)  
**Returns**: <code>String</code> - A clean, fully (potentially separated/accented) name.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>Object</code> |  |  |
| [config.min] | <code>Number</code> | <code>1</code> | Minimum number of syllables. |
| [config.max] | <code>Number</code> | <code>3</code> | Maximum number of syllables. |
| [config.language] | [<code>LANGUAGES</code>](#LANGUAGES) |  | The language of the name. If not specified, a language will be picked at random. |
| [config.debug] | <code>Boolean</code> |  | Return additional information. |


* * *

<a name="module_generators.module_names.createName.LANGUAGES"></a>

####################### createName.LANGUAGES : [<code>LANGUAGES</code>](#LANGUAGES)
**Kind**: static property of [<code>createName</code>](#module_generators.module_names.createName)  

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


<!-- AUTO-GENERATED-CONTENT:END -->
<!-- cspell:enable -->

# `@nemodreamer/generators`

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Procedural generators, for games and fake data.

<!-- cspell:disable -->
<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [API](#api)
  - [Modules](#modules)
  - [helpers](#helpers)
  - [random](#random)
    - [random.getRandom ⇒ any](#randomgetrandom--any)
    - [random.getRange ⇒ number](#randomgetrange--number)
    - [random.doProbability ⇒ boolean](#randomdoprobability--boolean)
  - [generators](#generators)
  - [names](#names)
    - [names.createName(config) ⇒ string | Object](#namescreatenameconfig--string--object)
  - [LANGUAGES : enum](#languages--enum)

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

---

<a name="module_helpers.module_random"></a>

### random

- [random](#module_helpers.module_random)
  - [.getRandom](#module_helpers.module_random.getRandom) ⇒ <code>any</code>
  - [.getRange](#module_helpers.module_random.getRange) ⇒ <code>number</code>
  - [.doProbability](#module_helpers.module_random.doProbability) ⇒ <code>boolean</code>

---

<a name="module_helpers.module_random.getRandom"></a>

#### random.getRandom ⇒ <code>any</code>

**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)

**Returns**: <code>any</code> - Random element from input array.

|Param|Type|Description|
|-|-|-|
|arr|<code>[ &#x27;Array&#x27; ].&lt;any&gt;</code>|Input array.|

---

<a name="module_helpers.module_random.getRange"></a>

#### random.getRange ⇒ <code>number</code>

**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)

**Returns**: <code>number</code> - A random number between `min` and `max` (including).

|Param|Type|
|-|-|
|min|<code>number</code>|
|max|<code>number</code>|

---

<a name="module_helpers.module_random.doProbability"></a>

#### random.doProbability ⇒ <code>boolean</code>

**Kind**: static constant of [<code>random</code>](#module_helpers.module_random)

|Param|Type|Description|
|-|-|-|
|p|<code>number</code>|Probability as float between 0-1.|

---

<a name="module_generators"></a>

### generators

---

<a name="module_generators.module_names"></a>

### names

---

<a name="module_generators.module_names.createName"></a>

#### names.createName(config) ⇒ <code>string</code> \| <code>Object</code>

Creates a name in a given language.

"Languages" are approximations based on basic combination "rules" of selected
vowels/consonants.

**Kind**: static method of [<code>names</code>](#module_generators.module_names)

**Returns**: <code>string</code> \| <code>Object</code> - A clean, fully (potentially separated/accented) name, or (if `config.debug`)
an object with additional information.

|Param|Type|Default|Description|
|-|-|-|-|
|config|<code>Object</code>|||
|[config.min]|<code>number</code>|<code>1</code>|Minimum number of syllables.|
|[config.max]|<code>number</code>|<code>3</code>|Maximum number of syllables.|
|[config.language]|[<code>LANGUAGES</code>](#LANGUAGES)||The language of the name. If not specified, a language will be picked at random.|
|[config.debug]|<code>boolean</code>||Return additional information.|

---

<a name="LANGUAGES"></a>

### LANGUAGES : <code>enum</code>

Language of generated name

**Kind**: global enum  
**Read only**: true  
**Properties**

- DEFAULT <code>string</code> - No clear origin.
- RANDOM <code>string</code> - No weights.
- NORDIC <code>string</code> - Hit-and-miss, since you still might get endings that sound latin...
- LATIN <code>string</code> - ... at least until we can add some post-processing.
- GOBLIN <code>string</code>
- MOLE <code>string</code>
- SPIDER <code>string</code>
- BIBO <code>string</code>

---

<!-- AUTO-GENERATED-CONTENT:END -->
<!-- cspell:enable -->

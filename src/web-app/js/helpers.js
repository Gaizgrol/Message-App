/**
 * Substituição por uma sintaxe mais simples, não utilizei o $ para não conflitar caso queiram utilizar JQuery no futuro
 * 
 * @param { string } id 
 * @returns { HTMLElement }
 */
const $_ = id => document.getElementById( id );

/**
 * Escapa tags HTML de uma string
 * 
 * @param { string } str 
 * @returns { string }
 */
const safeTags = str =>  str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

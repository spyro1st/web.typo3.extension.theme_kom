<?php

$TYPO3_CONF_VARS['EXTCONF']['realurl']['_DEFAULT'] = array(

    'init' => array(
        'enableCHashCache' => 1,
        'appendMissingSlash' => 'ifNotFile',
        'enableUrlDecodeCache' => 1,
        'enableUrlEncodeCache' => 1,
        'enableAllUnicodeLetters' => 1,
    ),

    'redirects_regex' => array(),

    'preVars' => array(
        array(
            'GETvar' => 'L',
            'valueMap' => array(
                'en' => '1',
            ),
            'noMatch' => 'bypass',
        ),
        array(
            'GETvar' => 'no_cache',
            'valueMap' => array(
                'nc' => '1',
            ),
            'noMatch' => 'bypass'
        ),
    ),

    'pagePath' => array(
        'type' => 'user',
        'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
        'spaceCharacter' => '-',
        'expireDays' => 7,
        'segTitleFieldList' => 'tx_realurl_pathsegment,alias,nav_title,title',
    ),

    'fixedPostVars' => array(),

    'postVarSets' => array(),

    'fileName' => array(
        'defaultToHTMLsuffixOnPrev' => 0,
        'index' => array(
            '_DEFAULT' => array(
                'keyValues' => array(
                    'type' => 0,
                )
            ),
            'modal.html' => array(
                'keyValues' => array(
                    'type' => 1493968269,
                ),
            ),
        ),
    ),
);

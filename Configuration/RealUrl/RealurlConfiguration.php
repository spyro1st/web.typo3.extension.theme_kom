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

    'fixedPostVars' => array(
        'komConfiguration' => array(
            array(
                'GETvar' => 'tx_kom_pi1[controller]',
                'noMatch' => 'bypass',
            ),
            array(
                'GETvar' => 'tx_kom_pi1[action]',
                'valueMap' => array(
                ),
                'noMatch' => 'bypass',
            ),
            array(
                'GETvar' => 'tx_kom_pi1[election]',
                'lookUpTable' => array(
                    'table' => 'tx_kom_domain_model_election',
                    'id_field' => 'uid',
                    'alias_field' => 'title',
                    'addWhereClause' => ' AND NOT deleted',
                    'useUniqueCache' => 1,
                    'useUniqueCache_conf' => array(
                        'strtolower' => 1,
                        'spaceCharacter' => '-'
                    )
                ),
            ),
            array(
                'GETvar' => 'tx_kom_pi1[electionDistrict]',
                'lookUpTable' => array(
                    'table' => 'tx_kom_domain_model_electiondistrict',
                    'id_field' => 'uid',
                    'alias_field' => 'title',
                    'addWhereClause' => ' AND NOT deleted',
                    'useUniqueCache' => 1,
                    'useUniqueCache_conf' => array(
                        'strtolower' => 1,
                        'spaceCharacter' => '-'
                    )
                ),
            ),
        ),
        // uid of the detail commerce page on live
        '3' => 'komConfiguration',
        '4' => 'komConfiguration',
        '5' => 'komConfiguration',
        '6' => 'komConfiguration',
        '7' => 'komConfiguration',
        '8' => 'komConfiguration',
    ),

    'postVarSets' => array(
        '_DEFAULT' => array(
            'kom' => array(
                array(
                    'GETvar' => 'tx_kom_pi1[controller]',
                    'noMatch' => 'bypass',
                ),
                array(
                    'GETvar' => 'tx_kom_pi1[action]',
                    'valueMap' => array(
                        'umfrage' => 'questionnaire',
                        'gewichtung' => 'emphasize',
                        'ergebnis' => 'result',
                        'vergleich' => 'compare',
                        'navigation' => 'navigation',
                    ),
                    'noMatch' => 'bypass',
                ),
                array(
                    'GETvar' => 'tx_kom_pi1[election]',
                    'lookUpTable' => array(
                        'table' => 'tx_kom_domain_model_election',
                        'id_field' => 'uid',
                        'alias_field' => 'title',
                        'addWhereClause' => ' AND NOT deleted',
                        'useUniqueCache' => 1,
                        'useUniqueCache_conf' => array(
                            'strtolower' => 1,
                            'spaceCharacter' => '-'
                        )
                    ),
                ),
                array(
                    'GETvar' => 'tx_kom_pi1[electionDistrict]',
                    'lookUpTable' => array(
                        'table' => 'tx_kom_domain_model_electiondistrict',
                        'id_field' => 'uid',
                        'alias_field' => 'title',
                        'addWhereClause' => ' AND NOT deleted',
                        'useUniqueCache' => 1,
                        'useUniqueCache_conf' => array(
                            'strtolower' => 1,
                            'spaceCharacter' => '-'
                        )
                    ),
                ),
            ),
            'schritt' => array(
                array(
                    'GETvar' => 'tx_kom_pi1[step]',
                ),
            ),
        ),
    ),

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

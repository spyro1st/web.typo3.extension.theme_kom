<?php

/***************************************************************
 * Extension Manager/Repository config file for ext: "theme_kom"
 *
 *
 * Manual updates:
 * Only the data in the array - anything else is removed by next write.
 * "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array(
    'title' => 'Kandidat-O-Mat Theme',
    'description' => 'Theme development extension of website \"Kandidat-O-Mat\"',
    'category' => 'templates',
    'author' => 'DigitalPatrioten AG',
    'author_email' => 'info@digitalpatrioten.com',
    'state' => 'stable',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.5.0',
    'constraints' => array(
        'depends' => array(
            'typo3' => '7.6.0-7.6.99',
            'themes' => '7.0.3-7.0.99',
            'gridelements' => '7.4.0-7.4.99'
        ),
        'conflicts' => array(),
        'suggests' => array(),
    )
);

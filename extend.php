<?php
/*
 * This file is part of malago/flarum-linkpreview
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Malago\LinkPreview;

use Flarum\Api\Controller;
use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use Malago\LinkPreview\Api\Controllers;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Routes('api'))
        ->get('/linkpreview', 'linkpreview.index', Controllers\GetLinkPreview::class),
    (new Extend\Locales(__DIR__ . '/locale')),
    (new Extend\Settings)
        ->serializeToForum('malago.linkpreview.key', 'malago.linkpreview.key')
];

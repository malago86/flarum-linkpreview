<?php

/*
 * This file is part of malago/achievements
 *
 *  Copyright (c) 2021 Miguel A. Lago
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Malago\LinkPreview\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Api\Controller\AbstractSerializeController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\SerializerInterface;
use Tobscure\JsonApi\ElementInterface;
use Flarum\User\User;

class GetLinkPreview extends AbstractShowController
{

    /**
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $u = User::all();
        return $u;
    }

    protected function createElement($data, SerializerInterface $serializer){
        
    }
}
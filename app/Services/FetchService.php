<?php

namespace App\Services;

use Illuminate\Support\Collection;

abstract class FetchService
{
    abstract public function fetch(array $queryParams = []): Collection;
}

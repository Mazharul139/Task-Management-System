<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Policies\TaskPolicy;

class Task extends Model
{
    protected $guarded = [];
    public static $policy = TaskPolicy::class;

    public function user()
{
    return $this->belongsTo(User::class);
}


}

<?php

class VideoController extends BaseController
{
    public function getCount($query = null)
    {
        if (is_null($query)) {
            $count = Video::where('visibility', '=', 1)->count();
        } else {
            $count = Video::where('visibility', '=', 1)
                ->where('title', 'like', '%' . $query . '%')
                ->count();
        }

        return Response::json(array(
            'count' => $count
        ));
    }

    public function getList()
    {
        $input = Input::all();

        $currentPage = intval($input['currentPage']);
        $limit = intval($input['maxSize']);
        $offset = ($currentPage - 1) * $limit;
        $query = $input['query'];

        $data = Video::where('visibility', '=', 1)
            ->where('title', 'like', '%' . $query . '%')
            ->take($limit)
            ->skip($offset)
            ->orderBy('id', 'desc')
            ->get();

        return Response::json($data);
    }

    public function getSearch($query = null)
    {
        if (is_null($query)) {
            return Response::json(array(
                'error' => 400,
                'message' => 'Query is empty'
            ));
        }

        $count = Video::where('title', 'like', '%' . $query . '%')->count();

        return Response::json(array(
            'count' => $count
        ));
    }

}
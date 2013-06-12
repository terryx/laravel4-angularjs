<?php

class AuthController extends BaseController
{

    /*
    |--------------------------------------------------------------------------
    | Default Home Controller
    |--------------------------------------------------------------------------
    |
    | You may wish to use controllers instead of, or in addition to, Closure
    | based routes. That's great! Here is an example controller method to
    | get you started. To route to this controller, just add the route:
    |
    |	Route::get('/', 'HomeController@showWelcome');
    |
    */

    public function postLogin()
    {
        $input = Input::all();
        $response = array(
            'status' => 400,
            'message' => 'Invalid Login. Please try again'
        );

        if (isset($input['email']) && isset($input['password'])) {
            $credentials = array(
                'email' => $input['email'],
                'password' => $input['password']
            );

            if (Auth::attempt($credentials)) {
                $response = array(
                    'status' => 200,
                    'message' => 'OK'
                );
            }
        }

        return Response::json($response);
    }

}
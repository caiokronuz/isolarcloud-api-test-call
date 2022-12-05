import * as dotenv from 'dotenv'

import express from 'express'
import axios from 'axios'

import stringify from 'json-stringify-pretty-compact'

const app = express()
dotenv.config()

const port = process.env.NETWORK_PORT

app.get( '/' , async ( req , res ) => {

    try {
        
        const obj = await axios( {      // get the token.
            method: 'post',
            url: 'https://gateway.isolarcloud.com.hk/openapi/login',
            data: {
                appkey: process.env.APP_KEY,
                user_account: process.env.ACCOUNT,
                user_password: process.env.PASSWORD
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'sys_code': 901,
                'x-access-key': process.env.ACCESS_KEY,
            }
        } )
        .then( async res => {

            const { result_data: { token } } = res.data

            return await axios( {      // get the plant list.
                method: 'post',
                url: 'https://gateway.isolarcloud.com.hk/openapi/getPowerStationList',
                data: {
                    appkey: process.env.APP_KEY,
                    token: token,   // pass the token as a body parameter.
                    curPage: 1,
                    size: 10
                },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'sys_code': 901,
                    'x-access-key': process.env.ACCESS_KEY,
                }
            } )
            .then( res => {

                return res.data

            } )
            .catch( err => {

                if( err ) {
                    console.error( err.message )
                }

            } )

        } )
        .catch( err => {

            if( err ) {
                console.error( err.message )
            }

        } )

        res.send( obj === null || obj === undefined ? {} : `<pre>${ stringify( obj , { indent: '   ' } ) }</pre>` )
        res.end()

    } catch ( err ) {
        
        if( err ) {

            console.error( err.message )
            res.end( 'Internal Server Error' )

        }

    }

} )

app.listen( port , () => console.log( 'app is now running at port: ' + port ) )
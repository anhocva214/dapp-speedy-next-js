import Header from '@components/header';
import LogoImage from '@components/header/logo-image';
import { userActions, userSelector } from '@redux/user.redux';
import { routes } from '@utils/routes';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMetaMask } from "metamask-react";
import Web3 from 'web3'
import { contractCoinActions } from '@redux/contract-coin.redux';

type props = {
    children: ReactNode
}


const MainLayout = (props: props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const { authenticated, user } = useSelector(userSelector)

    useEffect(() => {
        dispatch(userActions.authenticate())
    }, [])

    useEffect(() => {
        if (status == 'connected') {
            try {
                let Window: any = window;
                let web3 = new Web3(Window.web3.currentProvider)
                let provider: any = web3.currentProvider
                // console.log("provider: ",provider)
                if (provider?.isMetaMask == true) {
                    dispatch(contractCoinActions.initWeb3({
                        web3
                    }))
                    setTimeout(() => {
                        if (authenticated) dispatch(userActions.getMyBalance({address: account}))
                    }, 1000);
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }, [status, authenticated])

    return (
        <>
            <Header/>
            {props.children}

        </>
    )

}

export default MainLayout;
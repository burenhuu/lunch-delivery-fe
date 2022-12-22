import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import CenteredSpin from "components/common/centered-spin";
import axios from "lib/utils/axios";
import TokiAPI from "lib/api/toki";
import { toast } from "react-toastify";

const WithAuth = ({ children }: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            const getUser = async () => {
                const token = router.query.tokenid?.toString();
                localStorage.clear();

                try {
                    const { data } = await TokiAPI.getUser(
                        token ? token : "aa"
                    );
                    if (data?.token) {
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${data?.token}`;
                    }
                    // const { data } = await TokiAPI.getUser(
                    //     router.query.tokenid?.toString()!
                    //     // ? router.query.tokenid.toString()
                    //     // : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNThjZGNlMGMyMzc0ODFkMzlmMjBlOSIsInRva2VuVHlwZSI6Ik1JTklQUk9HUkFNX1RPS0VOIiwibWluaVByb2dyYW1JZCI6IjYyNWJmMjBjYjIyYjZiYmE3ZjU3MDkwYiIsInRpbWVzdGFtcCI6MTY1NTQ1NDY1OTk3OCwiaWF0IjoxNjU1NDU0NjU5LCJleHAiOjE2NTU1NDEwNTl9.QG6LM_c-JWkQxIJUu_Rlff0NdwMHF9rBDjyHkMpl_so`
                    // );

                    // if (data.status_code === 0) {
                    //     const deliveryOptions =
                    //         data.data.user?.delivery_options || {};

                    //     if (
                    //         deliveryOptions &&
                    //         deliveryOptions.delivery_instruction
                    //     ) {
                    //         delete deliveryOptions.delivery_instruction;
                    //     }

                    //     localStorage.setItem(
                    //         "phoneNumber",
                    //         data.data.user?.phone_no || ""
                    //     );
                    //     localStorage.setItem(
                    //         "locationRange",
                    //         data.data.location_range || "1000"
                    //     );
                    //     localStorage.setItem(
                    //         "deliveryOptions",
                    //         JSON.stringify(deliveryOptions)
                    //     );

                    //     axios.defaults.headers.common[
                    //         "Authorization"
                    //     ] = `Bearer ${data.data.access_token}`;
                    // } else {
                    //     toast(data.message);
                    // }
                } finally {
                    setLoading(false);
                }
            };

            getUser();
        }
    }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) return <CenteredSpin />;

    return children;
};

export default WithAuth;

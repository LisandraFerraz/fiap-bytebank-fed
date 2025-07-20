import { useUserContext } from "../../context/user-context";
import { env } from "../../pages/api/_environment/environment";
import { IPix } from "../interfaces/transaction";

export const UsePix = () => {
  const { account, access_token } = useUserContext();

  const sendPix = async (body: IPix) => {
    const response = await fetch(
      `${env.NEST_API}/account/${account?._id}/transaction/new`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const resFormatted = await response.json();

    return resFormatted;
  };

  const deletePix = async (id: string) => {
    return await fetch(
      `${env.NEST_API}/account/${account?._id}/transaction/delete?transId=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const updatePix = async (body: IPix) => {
    return await fetch(`${env.NEST_API}/account/${account?._id}/transaction`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  return {
    sendPix,
    deletePix,
    updatePix,
  };
};

import { useUserContext } from "../../context/user-context";
import { endpoints } from "../../environment/endpoints";
import { env } from "../../pages/api/_environment/environment";
import { IPix } from "../interfaces/transaction";

export const UsePix = () => {
  const { account } = useUserContext();

  const sendPix = async (body: IPix) => {
    const response = await fetch(
      `${env.NEST_API}/account/${account?._id}/transaction/new`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
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
      }
    );
  };

  const updatePix = async (body: IPix) => {
    return await fetch(`${env.NEST_API}/account/${account?._id}/transaction`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    sendPix,
    deletePix,
    updatePix,
  };
};

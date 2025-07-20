import { useUserContext } from "../../context/user-context";
import { env } from "../../pages/api/_environment/environment";
import { ITed } from "../interfaces/transaction";

export const useTed = () => {
  const { account, access_token } = useUserContext();

  const sendTed = async (body: ITed) => {
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

  const deleteTed = async (id: string) => {
    const response = await fetch(
      `${env.NEST_API}/account/${account?._id}/transaction/delete?transId=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const resFormatted = await response.json();
    return resFormatted;
  };

  const updateTed = async (body: ITed) => {
    const response = await fetch(
      `${env.NEST_API}/account/${account?._id}/transaction`,
      {
        method: "PATCH",
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

  return { sendTed, deleteTed, updateTed };
};

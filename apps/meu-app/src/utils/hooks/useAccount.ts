import { useUserContext } from "../../context/user-context";
import { env } from "../../pages/api/_environment/environment";

export const UseAccount = () => {
  const { user } = useUserContext();

  const getAccountByCpf = async () => {
    const response = await fetch(`${env.NEST_API}/account/one/${user?.cpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  };

  const getAccountDetails = async () => {
    const response = await fetch(`/api/transactions?usuarioCpf=${user?.cpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedAccount = await response.json();

    return parsedAccount;
  };

  return {
    getAccountByCpf,
    getAccountDetails,
  };
};

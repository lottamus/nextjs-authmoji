import * as React from "react";

export default function Home() {
  const [isSending, setIsSending] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    if (errorMsg) setErrorMsg("");

    const body = {
      phoneNumber: e.currentTarget.phonenumber.value,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        const { verifyUrl } = await res.json();
        // Redirect to Authmoji so the user can confirm their phone number
        window.location.href = verifyUrl;
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }

    setIsSending(false);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-12 mx-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Verify your mobile number
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="phonenumber"
                  autoComplete="phonenumber"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {errorMsg && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errorMsg}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Code"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

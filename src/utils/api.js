const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";

  async function _fetchWithAuth(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || "Request failed");
    }

    return response;
  }

  // Menyimpan token di localStorage
  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  // Mendapatkan token dari localStorage
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // Fungsi untuk registrasi
  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Registration failed");
    }
    return responseJson.message;
  }

  // Fungsi untuk login
  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Login failed");
    }
    return responseJson.data.token;
  }

  // Mendapatkan informasi user saat ini
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    return responseJson.data.user;
  }

  // Mengubah foto profil
  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);

    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData, // Biarkan browser menangani header Content-Type
    });

    const responseJson = await response.json();
    return responseJson.message;
  }

  // Menambahkan cash flow baru
  async function postAddCashFlow({
    type,
    source,
    label,
    description,
    nominal,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, source, label, description, nominal }),
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Data tidak valid");
    }

    return responseJson.data.cash_flow_id;
  }

  // Mendapatkan detail cash flow berdasarkan ID
  async function getDetailCashFlow(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`);
    const responseJson = await response.json();
    return responseJson.data.cash_flow;
  }

  // Mengupdate cash flow yang ada
  async function putUpdateCashFlow({
    id,
    type,
    source,
    label,
    description,
    nominal,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        source,
        label,
        description,
        nominal,
      }),
    });

    const responseJson = await response.json();
    return responseJson.message;
  }

  // Menghapus cash flow berdasarkan ID

  async function getAllCashFlows() {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}/cash-flows`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType); // Logging Content-Type

    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.log("Error response:", errorText); // Logging error response
      throw new Error("Server returned non-JSON response");
    }

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(
        responseJson.message || "Gagal mengambil data cash flows"
      );
    }

    return responseJson.data.cash_flows;
  }

  async function deleteCashFlow(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  //getDailyCashGlowsStats
  async function getDailyCashFlowStats({ endDate, totalData }) {
    const url = new URL(`${BASE_URL}/cash-flows/stats/daily`);
    url.searchParams.append("end_date", endDate);
    url.searchParams.append("total_data", totalData);
  
    const response = await _fetchWithAuth(url.toString(), {
      method: "GET",
    });
  
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || "Failed to fetch daily cash flow stats");
    }
  
    const data = await response.json();
    return data;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postChangePhotoProfile,
    postAddCashFlow,
    putUpdateCashFlow,
    deleteCashFlow,
    getAllCashFlows,
    getDetailCashFlow,
    getDailyCashFlowStats
  };
})();

export default api;

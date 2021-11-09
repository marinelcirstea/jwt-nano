const path = require("path");
require("dotenv").config({ path: path.resolve("dev.env") });

const { encode, decode } = require("../dist/index.js");

test(`encode object { exp: 0, iat: 0, message:"Hello, world!" }`, () => {
  expect(encode({ exp: 0, iat: 0, message: "Hello, world!" })).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.QKK-6UFJdzLcX0ebIgbGWQR_GxQWcSVE04zaAvuIhyQ"
  );
  expect(encode({ exp: 0, iat: 0, message: "Hello, world!" }, "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.QKK-6UFJdzLcX0ebIgbGWQR_GxQWcSVE04zaAvuIhyQ"
  );
  expect(
    encode({ exp: 0, iat: 0, message: "Hello, world!" }, "abcdefg", "HS384")
  ).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.krG66YnbM0HRW465qSwp6Lsq7KFKNTOCg7_btvjJLk1S3zHhhMWYi0glEiHk3G2V"
  );
  expect(
    encode({ exp: 0, iat: 0, message: "Hello, world!" }, "abcdefg", "HS512")
  ).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.MoJHdPU9Roq2f75NDyLdWqvsRhRlVKGEW8oJVT2Ffq1dY42jN_bS-mK1xMULHGNIcpeNQEIKdwulbjfv-LMTVA"
  );
});

test(`decode from token to { exp: 0, iat: 0, message:"Hello, world!" }`, () => {
  expect(
    decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.QKK-6UFJdzLcX0ebIgbGWQR_GxQWcSVE04zaAvuIhyQ"
    )
  ).toEqual({ exp: 0, iat: 0, message: "Hello, world!" });
  expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.QKK-6UFJdzLcX0ebIgbGWQR_GxQWcSVE04zaAvuIhyQ","abcdefg")).toEqual({ exp: 0, iat: 0, message: "Hello, world!" })
  expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.krG66YnbM0HRW465qSwp6Lsq7KFKNTOCg7_btvjJLk1S3zHhhMWYi0glEiHk3G2V","abcdefg","HS384")).toEqual({ exp: 0, iat: 0, message: "Hello, world!" })
  expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.MoJHdPU9Roq2f75NDyLdWqvsRhRlVKGEW8oJVT2Ffq1dY42jN_bS-mK1xMULHGNIcpeNQEIKdwulbjfv-LMTVA","abcdefg","HS512")).toEqual({ exp: 0, iat: 0, message: "Hello, world!" })
});

test("encode empty object {}", () => {
  expect(encode({})).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.9d_XRuf3gJFgQqWMmpjJT2jPa6uOuiKE4jVX7LkC7FU"
  );
  expect(encode({}, "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.9d_XRuf3gJFgQqWMmpjJT2jPa6uOuiKE4jVX7LkC7FU"
  );
  expect(encode({}, "abcdefg", "HS384")).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.e30.3NDFpGfAJOVVdzA-hnA3W5gXfmTzfMHDlPIWjrb_n0C6HTrz5VUDV3q60FJ627dh"
  );
  expect(encode({}, "abcdefg", "HS512")).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.e30.oSPY98faRuyGFvk11lrPAtbTPeq6_aZh0T5bGypxVdsSvK6zCIfkssoWxtlh3WbV6BlJatLDrzhqPJjJIvYgCA"
  );
});
test("decode to empty object {}",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.9d_XRuf3gJFgQqWMmpjJT2jPa6uOuiKE4jVX7LkC7FU")).toEqual({})
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.9d_XRuf3gJFgQqWMmpjJT2jPa6uOuiKE4jVX7LkC7FU", "abcdefg")).toEqual({})
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.e30.3NDFpGfAJOVVdzA-hnA3W5gXfmTzfMHDlPIWjrb_n0C6HTrz5VUDV3q60FJ627dh", "abcdefg", "HS384")).toEqual({})
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.e30.oSPY98faRuyGFvk11lrPAtbTPeq6_aZh0T5bGypxVdsSvK6zCIfkssoWxtlh3WbV6BlJatLDrzhqPJjJIvYgCA", "abcdefg", "HS512")).toEqual({})
})

test("encode empty string to be null", () => {
  expect(encode("")).toBe(null);
  expect(encode("", "abcdefg")).toBe(null);
  expect(encode("", "abcdefg", "HS512")).toBe(null);
  expect(encode("", "abcdefg", "HS384")).toBe(null);
});

test("decode to empty string to be null",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..aBSkvB8r_f8QTvqHwl0x-4pH9SW7cJ7LakS8G5OviBY")).toBe(null)
})

test("encode string abc", () => {
  expect(encode("abc")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YWJj.n-JAwBFPy4Ot1l8Mc9zLET2qaAw_FzXj10GsVZx9fP4"
  );
  expect(encode("abc", "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YWJj.n-JAwBFPy4Ot1l8Mc9zLET2qaAw_FzXj10GsVZx9fP4"
  );
  expect(encode("abc", "abcdefg", "HS384")).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.YWJj.50YXELat_sjkBuzv2XA8_tMLmscSsNKppHjE201M2GsKskbCbThsDgJXcdEYFmgb"
  );
  expect(encode("abc", "abcdefg","HS512")).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.YWJj.0zDiMAO_sEmJgJuOpW8t0WFOM4l0YVpQqloduRvKBAMFcbUUFcBKhf_sWrHpqlfZS1yKSeCVT6Yzqn5L8Ruezw"
  );
});
test("decode to string abc",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YWJj.n-JAwBFPy4Ot1l8Mc9zLET2qaAw_FzXj10GsVZx9fP4")).toBe("abc")
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YWJj.n-JAwBFPy4Ot1l8Mc9zLET2qaAw_FzXj10GsVZx9fP4", "abcdefg")).toBe("abc")
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.YWJj.50YXELat_sjkBuzv2XA8_tMLmscSsNKppHjE201M2GsKskbCbThsDgJXcdEYFmgb", "abcdefg", "HS384")).toBe("abc")
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.YWJj.0zDiMAO_sEmJgJuOpW8t0WFOM4l0YVpQqloduRvKBAMFcbUUFcBKhf_sWrHpqlfZS1yKSeCVT6Yzqn5L8Ruezw", "abcdefg", "HS512")).toBe("abc")
})

test("encode number 123", () => {
  expect(encode(123)).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIz.Ra_sk79bv0DqGbt-2JTIR6fdaIjXfKi8nu4eCkjrAGM"
  );
  expect(encode(123, "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIz.Ra_sk79bv0DqGbt-2JTIR6fdaIjXfKi8nu4eCkjrAGM"
  );
  expect(encode(123, "abcdefg", "HS384")).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.MTIz.2Cd1_fO7kvGb3wafZHYs4JQxwk1jYa7BHNZ2TBgWr-s8UAhNgZevDld6h4y_P6AZ"
  );
  expect(encode(123, "abcdefg", "HS512")).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.MTIz.38To8_w2bpkDRHdRbxL4Xb4BVVmtlRcT3KgOsfcC9hOHIygpNs-4cq0PaATI3lbnZMpo1sUW4URtO3OVFG_lBQ"
  );
});

test("decode to number 123",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIz.Ra_sk79bv0DqGbt-2JTIR6fdaIjXfKi8nu4eCkjrAGM")).toBe(123)
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTIz.Ra_sk79bv0DqGbt-2JTIR6fdaIjXfKi8nu4eCkjrAGM","abcdefg")).toBe(123)
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.MTIz.2Cd1_fO7kvGb3wafZHYs4JQxwk1jYa7BHNZ2TBgWr-s8UAhNgZevDld6h4y_P6AZ","abcdefg","HS384")).toBe(123)
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.MTIz.38To8_w2bpkDRHdRbxL4Xb4BVVmtlRcT3KgOsfcC9hOHIygpNs-4cq0PaATI3lbnZMpo1sUW4URtO3OVFG_lBQ","abcdefg","HS512")).toBe(123)
})

test("encode number 0 ",()=>{
    expect(encode(0)).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MA.v9iT6jPu-xAzJO5nN6DhNedUj4nEQlwGSY5ZxGByjuA")
    expect(encode(0, "abcdefg")).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MA.v9iT6jPu-xAzJO5nN6DhNedUj4nEQlwGSY5ZxGByjuA")
    expect(encode(0, "abcdefg","HS384")).toBe("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.MA.OKLRWvirYxwQJVEtHhZqjQ7rVCfCKfoFnrarBhLyDEVTACSHwLsteW1WLJh20VMV")
    expect(encode(0, "abcdefg","HS512")).toBe("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.MA.8KkqLEul7ZEFuqw8YQbiZbexsRfJiFn45ZBhoYZ54NzXeU_g8DhqjqMm0pdbhYdzKgls7Tl7F-p5EIDOvZbSmg")
})

test("decode to number 0",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MA.v9iT6jPu-xAzJO5nN6DhNedUj4nEQlwGSY5ZxGByjuA")).toBe(0)
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MA.v9iT6jPu-xAzJO5nN6DhNedUj4nEQlwGSY5ZxGByjuA","abcdefg")).toBe(0)
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.MA.OKLRWvirYxwQJVEtHhZqjQ7rVCfCKfoFnrarBhLyDEVTACSHwLsteW1WLJh20VMV","abcdefg","HS384")).toBe(0)
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.MA.8KkqLEul7ZEFuqw8YQbiZbexsRfJiFn45ZBhoYZ54NzXeU_g8DhqjqMm0pdbhYdzKgls7Tl7F-p5EIDOvZbSmg","abcdefg","HS512")).toBe(0)
})

test("encode boolean true",()=>{
    expect(encode(true)).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.ulsFq9jlZbHpcR1f8Q6I0LlHjUWABTpVLbtnuIOvSVo")
    expect(encode(true,"abcdefg")).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.ulsFq9jlZbHpcR1f8Q6I0LlHjUWABTpVLbtnuIOvSVo")
    expect(encode(true,"abcdefg","HS384")).toBe("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.dHJ1ZQ.SlFPuiHrDx-BP8BPlmHtRuXWcfdzUTVB6HIM1eDyBLUUXHwBFaY7jkqahSwvmqg1")
    expect(encode(true,"abcdefg","HS512")).toBe("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.51md5qEaAaPcybrRubSJK9ErsAe60M_EFvp1thl_gkSIOdEuKr9KCqsR_diVSA93kKLbQ61it9LDer3xrr1yiA")
})
test("decode to boolean true",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.ulsFq9jlZbHpcR1f8Q6I0LlHjUWABTpVLbtnuIOvSVo")).toBe(true)
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.ulsFq9jlZbHpcR1f8Q6I0LlHjUWABTpVLbtnuIOvSVo", "abcdefg")).toBe(true)
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.dHJ1ZQ.SlFPuiHrDx-BP8BPlmHtRuXWcfdzUTVB6HIM1eDyBLUUXHwBFaY7jkqahSwvmqg1", "abcdefg", "HS384")).toBe(true)
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.dHJ1ZQ.51md5qEaAaPcybrRubSJK9ErsAe60M_EFvp1thl_gkSIOdEuKr9KCqsR_diVSA93kKLbQ61it9LDer3xrr1yiA", "abcdefg", "HS512")).toBe(true)
})

test("encode boolean false",()=>{
    expect(encode(false)).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ZmFsc2U.6PnmqOCKW0scSXi7XuU44_Eiq_6cvW1-a_IWFhW-SqQ")
    expect(encode(false, "abcdefg")).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ZmFsc2U.6PnmqOCKW0scSXi7XuU44_Eiq_6cvW1-a_IWFhW-SqQ")
    expect(encode(false, "abcdefg","HS384")).toBe("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.ZmFsc2U.Uw0S0gsPwKPdvnM-QQGF4TSqm5PY6ntvcECAVjEAOO9JJ4p5DoRsoh_zwZDcozrr")
    expect(encode(false, "abcdefg","HS512")).toBe("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.ZmFsc2U.lvlQRwGWoHHm3W1ssDr-Iv-wa0-ATuS20ZxnfpWmSKiqkqhJplTH3pXA-CXckB1fBC-PXByqAJuuxtrdcrqf3Q")
})
test("decode to boolean false",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ZmFsc2U.6PnmqOCKW0scSXi7XuU44_Eiq_6cvW1-a_IWFhW-SqQ")).toBe(false)
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ZmFsc2U.6PnmqOCKW0scSXi7XuU44_Eiq_6cvW1-a_IWFhW-SqQ", "abcdefg")).toBe(false)
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.ZmFsc2U.Uw0S0gsPwKPdvnM-QQGF4TSqm5PY6ntvcECAVjEAOO9JJ4p5DoRsoh_zwZDcozrr", "abcdefg","HS384")).toBe(false)
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.ZmFsc2U.lvlQRwGWoHHm3W1ssDr-Iv-wa0-ATuS20ZxnfpWmSKiqkqhJplTH3pXA-CXckB1fBC-PXByqAJuuxtrdcrqf3Q", "abcdefg","HS512")).toBe(false)
})

test("encode to null",()=>{
    expect(encode(null)).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.bnVsbA.QbW4AiFwZJ3oAB9dd3JxaS1jnr86LVH_KvoLYHcMsM0")
})
test("decode to null",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.bnVsbA.QbW4AiFwZJ3oAB9dd3JxaS1jnr86LVH_KvoLYHcMsM0")).toBe(null)
})

test("encode empty array []", () => {
  // pass from env
  expect(encode([])).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.W10.wCHD7Wy3LI7u0scCjwI814IVf2w_IuuUpHrpCQC2CGc"
  );
  //pass from param
  expect(encode([], "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.W10.wCHD7Wy3LI7u0scCjwI814IVf2w_IuuUpHrpCQC2CGc"
  );
  expect(encode([], "abcdefg", "HS384")).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.W10.Yhxa8cjqb1je8sYEXKo9wMbjEGkvGMr8eNOi0u1-YN1pNIePgj4yyVX8m11pAfP9"
  );
  expect(encode([], "abcdefg", "HS512")).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.W10.ulSO4iJQnLo4282a7l9H3fu9WoBu_fYCEvINgMtM5TxNRgsK8mwEmYXjUxTXIQ2jqFySsE2oLOxA74reVcOzMw"
  );
});
test("decode to empty array []",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.W10.wCHD7Wy3LI7u0scCjwI814IVf2w_IuuUpHrpCQC2CGc")).toEqual([])
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.W10.wCHD7Wy3LI7u0scCjwI814IVf2w_IuuUpHrpCQC2CGc","abcdefg")).toEqual([])
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.W10.Yhxa8cjqb1je8sYEXKo9wMbjEGkvGMr8eNOi0u1-YN1pNIePgj4yyVX8m11pAfP9","abcdefg","HS384")).toEqual([])
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.W10.ulSO4iJQnLo4282a7l9H3fu9WoBu_fYCEvINgMtM5TxNRgsK8mwEmYXjUxTXIQ2jqFySsE2oLOxA74reVcOzMw","abcdefg","HS512")).toEqual([])
})

test("encode array [1, 2, 3, 4]", () => {
  //pass from env
  expect(encode([1, 2, 3, 4])).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.AbUAOAulTLuh92emoP4jDDap-thblNfhd6JQdwsHVug"
  );
  //pass as param
  expect(encode([1, 2, 3, 4], "abcdefg")).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.AbUAOAulTLuh92emoP4jDDap-thblNfhd6JQdwsHVug"
  );
  expect(encode([1, 2, 3, 4], "abcdefg", "HS384")).toBe(
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.gFEdlXPAPYAzk0Y5eq-HYDKNlfQMpCngAA4em47MkxappPGIGUVCKgvV_r-23L2Z"
  );
  expect(encode([1, 2, 3, 4], "abcdefg", "HS512")).toBe(
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.Tvx-24cGKiAX4fdEL_OJMqK2-INDGbVU_fjiaslnTfLHvderlfy59sfyIrg8-qXLZ1404qi9DPw3Zk2GlM-Lig"
  );
});
test("decode to array [1, 2, 3, 4]",()=>{
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.AbUAOAulTLuh92emoP4jDDap-thblNfhd6JQdwsHVug")).toEqual([1,2,3,4])
    expect(decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.AbUAOAulTLuh92emoP4jDDap-thblNfhd6JQdwsHVug", "abcdefg")).toEqual([1,2,3,4])
    expect(decode("eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.gFEdlXPAPYAzk0Y5eq-HYDKNlfQMpCngAA4em47MkxappPGIGUVCKgvV_r-23L2Z", "abcdefg", "HS384")).toEqual([1,2,3,4])
    expect(decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.WzEsMiwzLDRd.Tvx-24cGKiAX4fdEL_OJMqK2-INDGbVU_fjiaslnTfLHvderlfy59sfyIrg8-qXLZ1404qi9DPw3Zk2GlM-Lig", "abcdefg", "HS512")).toEqual([1,2,3,4])
})

// integrity
test("decode token with less than 3 segments to be null", () => {
  expect(
    decode(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ",
      "abcdefg",
      "HS512"
    )
  ).toBe(null);
});

test("decode token with more than 3 segments to be null", () => {
  expect(
    decode(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.MoJHdPU9Roq2f75NDyLdWqvsRhRlVKGEW8oJVT2Ffq1dY42jN_bS-mK1xMULHGNIcpeNQEIKdwulbjfv-LMTVA.asdf",
      "abcdefg",
      "HS512"
    )
  ).toBe(null);
});

test("decode token with corrupted header to be null", () => {
  expect(
    decode(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXUyJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.MoJHdPU9Roq2f75NDyLdWqvsRhRlVKGEW8oJVT2Ffq1dY42jN_bS-mK1xMULHGNIcpeNQEIKdwulbjfv-LMTVA",
      "abcdefg",
      "HS512"
    )
  ).toBe(null);
});

test("decode token with corrupted payload to be null", () => {
  expect(
    decode(
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZHMhIn0.MoJHdPU9Roq2f75NDyLdWqvsRhRlVKGEW8oJVT2Ffq1dY42jN_bS-mK1xMULHGNIcpeNQEIKdwulbjfv-LMTVA",
      "abcdefg",
      "HS512"
    )
  ).toBe(null);
});

test("decode token with corrupted signature to be null", () => {
    expect(
      decode(
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjAsImlhdCI6MCwibWVzc2FnZSI6IkhlbGxvLCB3b3JsZCEifQ.QKK-6UFJdzLcX0ebIgbGWQR_GxQWcSVE04zaAvuIhyQ",
        "abcdefg",
        "HS512"
      )
    ).toBe(null);
  });

test("decode expired token to be null", () => {
  expect(decode(encode({ exp: -1 }))).toBe(null);
});

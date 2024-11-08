import medusaClient from "shared/MedusaClient"

export const getMedusaHeaders = (tags) => {
    const headers = {
        next: {
            tags,
        },
    }

    const token = getCookie("_medusa_jwt");

    if (token && token !== undefined) {
        headers.authorization = `Bearer ${token}`
    } else {
        headers.authorization = ""
    }

    return headers
}

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 7);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict; Secure`;

};

export const getCookie = (name) => {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=");
        if (key === name) {
            return value;
        }
    }

    return undefined;
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
};



export async function getOrSetCart(countryCode) {
    const cartId = getCookie("_medusa_cart_id");
    let cart;

    if (cartId) {
        await medusaClient.carts.retrieve(cartId)
            .then((result) => {
                cart = result.cart;
            })
        return cart;
    }
    // const region = await getRegion(countryCode)

    // if (!region) {
    //     return null
    // }

    // const region_id = region.id

    let newCartId;
    if (!cart) {
        medusaClient.carts.create()
            .then(({ cart }) => {
                // console.log(cart.id);
                newCartId = cart.id;
                setCookie("_medusa_cart_id", newCartId, 7);

                // cart = await createCart({ region_id }).then((res) => res)
                // cart &&
                //     cookies().set("_medusa_cart_id", cart.id, {
                //         maxAge: 60 * 60 * 24 * 7,
                //         httpOnly: true,
                //         sameSite: "strict",
                //         secure: process.env.NODE_ENV === "production",
                //     })
                // revalidateTag("cart")
            })

        // if (cart && cart?.region_id !== region_id) {
        //         await updateCart(cart.id, { region_id })
        //         revalidateTag("cart")
        //     }

        //     return cart
    }

    if (newCartId) {
        await medusaClient.carts.retrieve(newCartId)
            .then((result) => {
                cart = result.cart;
            })
        console.log("getNewCart : ", cart);
        return cart;
    }

    return null;
}

export const fetchMedusaCart = async () => {
    try {
        const cart = await getOrSetCart("kr");
    } catch (error) {
        console.error("Failed to fetch Medusa cart:", error);
    }
};

export async function addItem({
    cartId,
    variantId,
    quantity,
    free,
    isLong,
    items
}) {
    const headers = getMedusaHeaders(["cart"])

    if (!isLong) {
        return medusaClient.carts.lineItems
            .create(cartId, { variant_id: variantId, quantity, free }, headers)
            .then(({ cart }) => cart)
            .catch((err) => {
                console.log(err)
                return null
            })
    } else {
        const { cart } = await medusaClient.carts.lineItems.create(cartId, items.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity,
            free: true,
        })), headers)
        console.log(cart?.items)
        return cart
    }
}
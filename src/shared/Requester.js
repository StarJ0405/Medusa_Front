import axios from "axios";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

class Requester {
  instance = null;

  constructor() {
    axios.defaults.withCredentials = true;
    this.instance = axios.create({
      baseURL: "http://59.26.140.16:8088/api",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      origin: "http://59.26.140.16:8088/",
      withCredentials: true,
      // baseURL: "http://localhost:8080/api",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
      // origin: "http://localhost:8080/",
      // withCredentials: true,
    });
  }

  setAuthTokenHeader(token) {
    this.instance = axios.create({
      baseURL: "http://59.26.140.16:8088/api",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      origin: "http://59.26.140.16:8088/",
      withCredentials: true,
    });
  }

  async get(url, data) {
    let instance = this.instance;
    let result = "";
    let params = "?" + new URLSearchParams(data).toString();
    try {
      return new Promise(function(resolve, reject) {
        instance
          .get(url + params)
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              } else {
              }
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }

  async post(url, data) {
    let instance = this.instance;
    let result = "";
    try {
      return new Promise(function(resolve, reject) {
        instance
          .post(url, JSON.stringify(data))
          .then((res) => {
            result = res.data;
          })
          .catch((error) => {
            if (error.response) {
              result = error.response.data;
              if (error.response.status === 401) {
                // invalid token
                result.code = error.response.status;
              } else {
              }
            } else if (error.request) {
            } else {
            }
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }

  async put(url, data) {
    let instance = this.instance;
    let result = "";
    try {
      return new Promise(function(resolve, reject) {
        instance
          .put(url, JSON.stringify(data))
          .then((res) => {
            result = res.data;
          })
          .catch((ex) => {
            result = ex;
          })
          .finally(() => {
            resolve(result);
          });
      });
    } catch (e) {}
  }

  async testTossRequest(type, data) {
    const tossPayments = await loadTossPayments(clientKey);
    tossPayments
      .requestPayment(type, {
        // 결제 정보 파라미터
        amount: data.amount,
        orderId: data.orderId,
        orderName: data.orderName,
        customerName: data.customerName,
        successUrl: data.successUrl,
        failUrl: data.failUrl,
        // useInternationalCardOnly: true
      })
      .catch(function(error) {
        if (error.code === "USER_CANCEL") {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === "INVALID_CARD_COMPANY") {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  }

  async vendorSignUp(data, callback) {
    callback(await this.post("admin/vendor/signUp", data));
  }

  async confirmVendor(data, callback) {
    callback(await this.put("admin/vendor/confirm", data));
  }

  async vendorSignIn(data, callback) {
    callback(await this.get("open/vendor/signIn", data));
  }

  async userSignUp(data, callback) {
    callback(await this.post("/open/user/signUp", data));
  }

  async userDuplicateCheck(data, callback) {
    callback(await this.post("/open/user/duplicate", data));
  }

  async userPasswordConfirm(data, callback) {
    callback(await this.post("/open/user/passwordConfirm", data));
  }

  async updateUserInfo(data, callback) {
    callback(await this.post("/open/user/update", data));
  }

  async findByUser(data, callback) {
    callback(await this.post("/open/user/findById", data));
  }

  async userSignIn(data, callback) {
    callback(await this.post("login", data));
  }

  async getAllUsers(callback) {
    callback(await this.get("admin/user/findAll"));
  }

  async getAllVendors(callback) {
    callback(await this.get("admin/vendor/findAll"));
  }

  async createProductCategory(data, callback) {
    callback(await this.post("productCategory/create", data));
  }

  async getAllProductCategories(callback) {
    callback(await this.get("open/productCategory/findAllLiquids"));
  }

  async getAllCategoriesForAdmin(callback) {
    callback(await this.get("admin/category/findAll"));
  }

  async updateProductCategory(data, callback) {
    callback(await this.put("productCategory/update", data));
  }

  async removeProductCategory(data, callback) {
    callback(await this.put("productCategory/removeById", data));
  }

  async getCategory(data, callback) {
    callback(await this.get("open/category/findById", data));
  }

  async getCategoryForAdmin(data, callback) {
    callback(await this.post("admin/category/findById", data));
  }

  async getAllCategories(callback) {
    callback(await this.get("open/category/findAll"));
  }

  async createBrand(data, callback) {
    callback(await this.post("brand/create", data));
  }

  async getAllBrands(callback) {
    callback(await this.get("open/brand/findAll"));
  }

  async getAllBrandsForAdmin(callback) {
    callback(await this.get("brand/findAll"));
  }

  async getBrand(data, callback) {
    callback(await this.get("open/brand/findById", data));
  }

  async updateBrand(data, callback) {
    callback(await this.put("brand/update", data));
  }

  async removeBrand(data, callback) {
    callback(await this.put("brand/removeById", data));
  }

  // async getProduct(data, callback) {
  //   callback(await this.post("open/product/findById", data));
  // }

  async findProductsByVendorId(data, callback) {
    callback(await this.post("open/product/findByVendorId", data));
  }

  async getProductForAdmin(data, callback) {
    callback(await this.post("admin/product/findById", data));
  }

  async saveCategory(data, callback) {
    callback(await this.put("admin/category/update", data));
  }

  async saveBrand(data, callback) {
    callback(await this.put("brand/update", data));
  }

  async createProduct(data, callback) {
    callback(await this.post("admin/product/create", data));
  }

  async saveProduct(data, callback) {
    callback(await this.put("admin/product/update", data));
  }
  async updateBulkProducts(data, callback) {
    callback(await this.put("admin/product/bulkUpdate", data));
  }

  async saveHashTag(data, callback) {
    callback(await this.put("admin/product/hashTag", data));
  }

  async createPartnersUrl(data, callback) {
    callback(await this.put("admin/user/createUrl", data));
  }

  async findPartnersUrl(callback) {
    callback(await this.get("admin/user/findUrl"));
  }

  async findPartnersHistoryCreate(data, callback) {
    callback(await this.post("open/user/partners/history/create", data));
  }

  async findPartnersHistory(callback) {
    callback(await this.post("admin/partners/history"));
  }

  async findSalesByDate(data, callback) {
    callback(await this.post("admin/sales/findSalesByDate", data));
  }

  async getCategoryForPartners(callback) {
    callback(await this.get("open/productCategory/findAllForPartners"));
  }

  async getAllProduct(callback) {
    callback(await this.get("admin/product/findAll"));
  }

  async getCategoryProductById(data, callback) {
    callback(await this.get("productCategory/findById", data));
  }

  async findSalesByLiquidCategory(data, callback) {
    callback(await this.post("admin/sales/findSalesByLiquidCategory", data));
  }

  async findSalesByDeviceCategory(data, callback) {
    callback(await this.post("admin/sales/findSalesByDeviceCategory", data));
  }

  async searchAccountSalesByUserName(data, callback) {
    callback(await this.post("admin/sales/accountSalesSearchByUserName", data));
  }

  async searchAccountSalesSearchAll(callback) {
    callback(await this.get("admin/sales/accountSalesSearchAll"));
  }

  async periodSales(data, callback) {
    callback(await this.post("admin/sales/periodSales", data));
  }

  async findcategorySalesAll(callback) {
    callback(await this.get("admin/sales/categorySalesAll"));
  }

  async findcategorySalesByDate(data, callback) {
    callback(await this.post("admin/sales/categorySalesByDate", data));
  }

  async findCategorySalesByProductTop5(callback) {
    callback(await this.get("admin/sales/categorySalesByProductTop5"));
  }

  async findSalesHistoryAll(callback) {
    callback(await this.get("admin/sales/findSalesHistoryAll"));
  }

  async findSalesHistoryByDate(data, callback) {
    callback(await this.post("admin/sales/findSalesHistoryByDate", data));
  }

  async findMyAccount(data, callback) {
    callback(await this.post("admin/partners/findMyAccount", data));
  }

  async findMyPartnersAccountSalesTop5(data, callback) {
    callback(
      await this.post("admin/partners/findMyPartnersAccountSalesTop5", data)
    );
  }

  async findMyPartnersAccounthistoryAll(data, callback) {
    callback(
      await this.post("admin/partners/findMyPartnersAccounthistoryAll", data)
    );
  }

  async findMyPartnersAccounthistoryByMyUser(data, callback) {
    callback(
      await this.post(
        "admin/partners/findMyPartnersAccounthistoryByMyUser",
        data
      )
    );
  }

  async findMyPartnersAccountFavoriteCategoryByMyUser(data, callback) {
    callback(
      await this.post(
        "admin/partners/findMyPartnersAccountFavoriteCategoryByMyUser",
        data
      )
    );
  }

  async findExhibition(callback) {
    callback(await this.get("open/brand/findExhibition"));
  }

  async findExhibitionByBrand(data, callback) {
    callback(await this.post("open/brand/findExhibitionByBrand", data));
  }

  async findEventAll(callback) {
    callback(await this.get("open/brand/findEventBrandAll"));
  }

  async findEventByBrand(data, callback) {
    callback(await this.post("open/brand/findEventByBrand", data));
  }

  async updateProductoptions(data, callback) {
    callback(await this.put("admin/productOption/update", data));
  }

  async findProductOptionsByUserId(callback) {
    callback(await this.post("admin/productOption/findById"));
  }

  async updatePurchaseOrderAddressUpdate(data, callback) {
    callback(await this.post("order/addressUpdate", data));
  }

  async partnersAccessStatistics(data, callback) {
    callback(await this.post("admin/partners/accessStatistics", data));
  }

  async updateOrderProduct(data, callback) {
    callback(await this.post("admin/order/product/update", data));
  }

  async addCart(data, callback) {
    callback(await this.post("cart/add", data));
  }

  async getAllCartProducts(callback) {
    callback(await this.post("cart/findAll"));
  }

  async deleteCarts(data, callback) {
    callback(await this.post("cart/deleteByIds", data));
  }

  async getNewProducts(callback) {
    callback(await this.get("open/product/findNewProducts"));
  }

  async getBestProducts(callback) {
    callback(await this.get("open/product/findBestProducts"));
  }

  async getRestockProducts(callback) {
    callback(await this.get("open/product/findRestockProducts"));
  }

  async getNewProductsForAdmin(callback) {
    callback(await this.get("admin/newProduct/findAll"));
  }

  async getBestProductsForAdmin(callback) {
    callback(await this.get("admin/bestProduct/findAll"));
  }

  async getRestockProductsForAdmin(callback) {
    callback(await this.get("admin/restockProduct/findAll"));
  }

  async orderProducts(data, callback) {
    callback(await this.post("order/create", data));
  }

  async getOrderProducts(callback) {
    callback(await this.get("order/findOrder"));
  }

  async getOrderAllProduct(callback) {
    callback(await this.get("order/findOrderAll"));
  }

  async getOrderProductsByDateTime(data, callback) {
    callback(await this.post("order/findOrderByDate", data));
  }

  async findLastThreeOrder(callback) {
    callback(await this.post("order/findLastThreeOrder"));
  }

  async updateCart(data, callback) {
    callback(await this.post("cart/update", data));
  }

  async deleteCart(data, callback) {
    callback(await this.post("cart/delete", data));
  }

  async saveNewShippingInfo(data, callback) {
    callback(await this.post("shippingInfo/add", data));
  }

  async saveShippingInfo(data, callback) {
    callback(await this.post("shippingInfo/update", data));
  }

  async getDefaultShippingInfo(callback) {
    callback(await this.get("shippingInfo/findDefaultShippingInfo"));
  }

  async getAllShippingInfos(callback) {
    callback(await this.post("shippingInfo/findAll"));
  }
  async shippingInfoFindById(data, callback) {
    callback(await this.post("shippingInfo/findById", data));
  }

  async updateDefaultShippingInfo(data, callback) {
    callback(await this.post("shippingInfo/updateDefault", data));
  }

  async getAllProvinces(callback) {
    callback(await this.get("open/address/findAllProvinces"));
  }

  async getProvince(data, callback) {
    callback(await this.get("open/address/findProvince", data));
  }

  async getCity(data, callback) {
    callback(await this.get("open/address/findCity", data));
  }

  async getpostalCode(data, callback) {
    callback(await this.get("open/address/findPostalCode", data));
  }

  async getAllCitiesByProvinceId(data, callback) {
    callback(await this.get("open/address/findAllCitiesByProvinceId", data));
  }

  async getAllPostalCodesByCityId(data, callback) {
    callback(await this.get("open/address/findAllPostalCodesByCityId", data));
  }

  async saveChat(data, callback) {
    callback(await this.post("chat/save", data));
  }

  async loadChat(callback) {
    callback(await this.get("chat/load"));
  }

  async searchProducts(data, callback) {
    callback(await this.post("open/product/search", data));
  }

  async findCouponAndPoint(callback) {
    callback(await this.post("userInfo/pointAndcoupon"));
  }

  async pointHistory(callback) {
    callback(await this.post("point/history"));
  }

  async createCoupon(data, callback) {
    callback(await this.post("coupon/create", data));
  }

  async findAllCoupon(callback) {
    callback(await this.post("coupon/findAll"));
  }

  async getCoupons(data, callback) {
    callback(await this.post("coupon/findCoupons", data));
  }

  async getProductWishes(callback) {
    callback(await this.post("wish/findProducts"));
  }

  async updateProductWish(data, callback) {
    callback(await this.post("wish/updateProduct", data));
  }

  async getBrandWishes(callback) {
    callback(await this.post("wish/findBrands"));
  }

  async updateBrandWish(data, callback) {
    callback(await this.post("wish/updateBrand", data));
  }

  async deleteWishProduct(data, callback) {
    callback(await this.post("wish/product/delete", data));
  }

  async deleteWishBrand(data, callback) {
    callback(await this.post("wish/brand/delete", data));
  }

  async deleteWishProducts(data, callback) {
    callback(await this.post("wish/product/deleteByIds", data));
  }

  async getAllReviews(data, callback) {
    callback(await this.get("review/findAll", data));
  }

  async createReview(data, callback) {
    callback(await this.post("review/create", data));
  }

  async deleteReview(data, callback) {
    callback(await this.post("review/delete", data));
  }

  async getAllQuestions(data, callback) {
    callback(await this.get("question/findAll", data));
  }

  async createQuestion(data, callback) {
    callback(await this.post("question/create", data));
  }

  async deleteQuestion(data, callback) {
    callback(await this.post("question/delete", data));
  }

  async getAllAnswers(data, callback) {
    callback(await this.get("question/answer/findAll", data));
  }

  async createAnswer(data, callback) {
    callback(await this.post("question/answer/create", data));
  }

  async deleteAnswer(data, callback) {
    callback(await this.post("question/answer/delete", data));
  }

  async getAllPolicies(callback) {
    callback(await this.get("open/policy/findAllPolicies"));
  }

  async getAllPrivacyPolicies(callback) {
    callback(await this.get("open/policy/findAllPrivacyPolicies"));
  }

  async getAllShippingPolicies(callback) {
    callback(await this.get("open/policy/findAllShippingPolicies"));
  }

  async deleteCategory(data, callback) {
    callback(await this.post("admin/category/delete", data));
  }

  async getAdminFindOrderAll(callback) {
    callback(await this.get("admin/order/findOrderAll"));
  }

  async updatePurchaseOrder(data, callback) {
    callback(await this.post("admin/order/update", data));
  }

  async getAllCarts(callback) {
    callback(await this.get("admin/cart/findAll"));
  }

  async findLayouts(data, callback) {
    callback(await this.post("admin/layouts/find", data));
  }

  async updateLayouts(data, callback) {
    callback(await this.post("admin/layouts/update", data));
  }

  async deleteShippingInfo(data, callback) {
    callback(await this.post("shippingInfo/delete", data));
  }

  async cancelPurchaseOrder(data, callback) {
    callback(await this.post("admin/order/cancel", data));
  }

  async returnCancelPurchaseOrder(data, callback) {
    callback(await this.post("admin/order/returnCancel", data));
  }

  async getOrderStatus(data, callback) {
    callback(await this.post("admin/order/getStatus", data));
  }

  async getExchangeAndRefund(data, callback) {
    callback(await this.post("admin/order/getExchangeAndRefund", data));
  }

  async getDelayStatistics(data, callback) {
    callback(await this.post("admin/order/getDelayStatistics", data));
  }

  async getProductManagement(callback) {
    callback(await this.get("admin/product/getProductManagement"));
  }

  async getArticleStatistics(callback) {
    callback(await this.get("admin/order/getArticleStatistics"));
  }

  async getUserStatistics(callback) {
    callback(await this.post("admin/user/getUserStatistics"));
  }

  async getProductStatistics(callback) {
    callback(await this.get("admin/product/getProductStatistics"));
  }

  async getTodayOrderStatistics(callback) {
    callback(await this.post("admin/order/getTodayOrderStatistics"));
  }

  async getTodayPaymentStatistics(callback) {
    callback(await this.get("admin/order/getTodayPaymentStatistics"));
  }

  async getTodayRefundStatistics(callback) {
    callback(await this.get("admin/order/getTodayRefundStatistics"));
  }

  async getDashboardTotal(callback) {
    callback(await this.get("admin/order/getDashboardTotal"));
  }

  async getSalesRate(callback) {
    callback(await this.get("admin/order/getSalesRate"));
  }

  async getReturnsAndCancel(callback) {
    callback(await this.get("admin/order/getReturnsAndCancel"));
  }

  async getAlmostOutOfStock(callback) {
    callback(await this.post("admin/product/getAlmostOutOfStock"));
  }

  async getProductsRequiringCare(callback) {
    callback(await this.post("admin/product/getProductsRequiringCare"));
  }
  async getSearchForProductTerms(data, callback) {
    callback(await this.post("admin/product/getSearchForProductTerms", data));
  }

  async getWeekVisitorStatistics(callback) {
    callback(await this.get("admin/user/getWeekVisitorStatistics"));
  }
  async getMonthNewMemberStatistics(callback) {
    callback(await this.get("admin/user/getMonthNewMemberStatistics"));
  }

  async getWeekNewMemberStatistics(callback) {
    callback(await this.get("admin/user/getWeekNewMemberStatistics"));
  }
  async getTodayNewMemberStatistics(callback) {
    callback(await this.get("admin/user/getTodayNewMemberStatistics"));
  }

  async getWeekWithdrawalMember(callback) {
    callback(await this.get("admin/user/getWeekWithdrawalMember"));
  }

  async getUserManagementStatistics(callback) {
    callback(await this.get("admin/user/getUserManagementStatistics"));
  }

  async getArticleStatistics2(callback) {
    callback(await this.get("admin/article/getArticleStatistics"));
  }

  async getArticleVolumeStatistics(callback) {
    callback(await this.get("admin/article/getArticleVolumeStatistics"));
  }

  async getWeeklyCartRate(callback) {
    callback(await this.get("cart/getWeeklyCartRate"));
  }

  async getAllUserGroups(callback) {
    callback(await this.post("admin/userGroup/findAll"));
  }

  async createOrderProduct(data, callback) {
    callback(await this.post("admin/order/createOrderProduct", data));
  }
  async deleteOrderProduct(data, callback) {
    callback(await this.post("admin/order/deleteOrderProduct", data));
  }

  async createPromotion(data, callback) {
    callback(await this.post("admin/promotion/create", data));
  }
  async getPromotion(callback) {
    callback(await this.get("admin/promotion/findAll"));
  }
  async deletePromotion(data, callback) {
    callback(await this.post("admin/promotion/delete", data));
  }
  async getSearchForOrderTerms(data, callback) {
    callback(await this.post("admin/order/search", data));
  }
  async findAllCategoriesOnlyTitle(callback) {
    callback(await this.get("open/category/findAllOnlyTitle"));
  }
  async findAllBrandsOnlyTitle(callback) {
    callback(await this.get("open/brand/findAllOnlyTitle"));
  }
  async createExhibition(data, callback) {
    callback(await this.post("admin/exhibition/create", data));
  }
  async getExhibitions(callback) {
    callback(await this.get("admin/exhibition/findAll"));
  }
  async deleteExhibition(data, callback) {
    callback(await this.post("admin/exhibition/delete", data));
  }
  async findWeeklyBestSeller(callback) {
    callback(await this.get("open/product/findWeeklyBestSeller"));
  }

  async saveNewProducts(data, callback) {
    callback(await this.post("admin/newProduct/save", data));
  }

  async saveBestProducts(data, callback) {
    callback(await this.post("admin/bestProduct/save", data));
  }

  async saveRestockProducts(data, callback) {
    callback(await this.post("admin/restockProduct/save", data));
  }

  async todayAccessStatistics(callback) {
    callback(await this.get("admin/user/todayAccessStatistics"));
  }

  async todayAccessStatistics(callback) {
    callback(await this.get("admin/user/todayAccessStatistics"));
  }

  async searchProductsPage(data, callback) {
    callback(await this.get("open/product/searchPage", data));
  }
  async getSearchForUserTerms(data, callback) {
    callback(await this.post("admin/user/getSearchForUserTerms", data));
  }

  async findSelf(callback) {
    callback(await this.get("user/findSelf"));
  }
  // 신규

  // 성재 ↓
}

export default Requester;

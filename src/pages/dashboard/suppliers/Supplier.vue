<template>
  <q-card flat style="min-height: 15vh">
    <q-card-section v-if="supplier">
      <q-card class="my-card" flat style="max-width: 600px">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h6">#{{ supplier.supplier.id }}</div>
            <div class="text-weight-thin q-mt-sm">Supplier Overview</div>
            <div class="text-h5 text-primary text-bold">{{ supplier.supplier.name }}</div>
            <div class="text-h6 text-weight-thin text-primary">Date Posted: {{ supplier.supplier.created_at }}</div>
            <q-btn
              unelevated
              outline
              color="secondary"
              label="Add Products"
              size="sm"
              class="q-mt-sm"
              @click="product()"
            />
          </q-card-section>
        </q-card-section>
        <!-- MODALS-->
        <!-- ADD PRODUCT -->
        <q-dialog v-model="modals.add_product.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="column items-start">
              <div class="text-h6 text-secondary q-mb-md">Add Product to: <p class="text-primary text-bold q-mb-none ">
                <span class="text-secondary text-weight-thin">#{{ supplier.supplier.id }}</span>
                {{ supplier.supplier.name }}
              </p>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form ref="form" @submit="addProduct" class="q-gutter-md">
                <q-input
                  outlined
                  type="text"
                  v-model="modals.add_product.name"
                  label="Product Name"
                  hint="Product Name"
                  maxlength="45"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  outlined
                  type="textarea"
                  v-model="modals.add_product.description"
                  label="Product Description"
                  hint="Product Description"
                  maxlength="45"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  outlined
                  type="number"
                  v-model="modals.add_product.quantity"
                  label="Product Quantity"
                  hint="Product Quantity"
                  min="0"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </q-form>
              <q-btn
                no-caps
                color="primary"
                class="full-width q-mt-md"
                type="submit"
                @click="$refs['form'].submit()"
              >
                Add Product
              </q-btn>
            </q-card-section>
            <q-inner-loading :showing="modals.add_product.loading">
              <q-spinner-ios size="40px" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>

        <!-- EDIT PRODUCT -->
        <q-dialog v-model="modals.edit_product.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="column items-start">
              <div class="text-h6 text-secondary q-mb-md">Edit Product Details: <p class="text-primary text-bold q-mb-none ">
                <span class="text-secondary text-weight-thin">#{{ supplier.supplier.id }}</span>
                {{ supplier.supplier.name }}
              </p>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form ref="form" @submit="updateProduct" class="q-gutter-md">
                <q-input
                  outlined
                  type="text"
                  v-model="modals.edit_product.name"
                  label="Product Name"
                  hint="Product Name"
                  maxlength="45"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  outlined
                  type="textarea"
                  v-model="modals.edit_product.description"
                  label="Product Description"
                  hint="Product Description"
                  maxlength="45"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  outlined
                  type="number"
                  v-model="modals.edit_product.quantity"
                  label="Adjust Product Quantity"
                  hint="Adjust Product Quantity"
                  min="0"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </q-form>
              <q-btn
                no-caps
                color="primary"
                class="full-width q-mt-md"
                type="submit"
                @click="$refs['form'].submit()"
              >
                Update Product
              </q-btn>
            </q-card-section>
            <q-inner-loading :showing="modals.edit_product.loading">
              <q-spinner-ios size="40px" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>

        <!--  REMOVE PRODUCT -->
        <q-dialog v-model="modals.remove_product.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="column items-start">
              <div class="text-h6 text-secondary q-mb-md">Remove from  <p class="text-primary text-bold q-mb-none text-h6">{{ modals.remove_product.name }}'s </p>Product List</div>

            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form ref="form" @submit="removeProduct" class="q-gutter-md">
                <q-input
                  readonly
                  outlined
                  type="text"
                  v-model="modals.remove_product.name"
                  label="Product Name"
                  hint="Product Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  readonly
                  outlined
                  type="textarea"
                  v-model="modals.remove_product.description"
                  label="Product Description"
                  hint="Product Description"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  readonly
                  outlined
                  type="number"
                  v-model="modals.remove_product.quantity"
                  label="Product Quantity"
                  hint="Product Quantity"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <p class="text-primary text-bold q-mb-none text-center">
                  Confirm removal of {{ modals.remove_product.name }} from your {{ supplier.supplier.name }}'s List
                </p>
              </q-form>
              <q-btn
                no-caps
                color="primary"
                class="full-width q-mt-md"
                type="submit"
                @click="$refs['form'].submit()"
              >
                Confirm
              </q-btn>
            </q-card-section>
            <q-inner-loading :showing="modals.remove_product.loading">
              <q-spinner-ios size="40px" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>

        <!-- VIEW ORDER MODAL-->
        <q-dialog v-model="modals.quick_view_order.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="row items-center bg-grey-3">
              <div class="text-h6 text-primary">View Order</div>
              <q-space/>
              <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
              <q-form @submit.prevent="" class="q-gutter-md">
                <q-input
                  outlined
                  readonly
                  type="text"
                  v-model="modals.quick_view_order.order_number"
                  label="Order Number"
                  hint="System Generated Order Number"
                />

                <q-select
                  filled
                  v-model="modals.quick_view_order.product_ids"
                  :options="modals.quick_view_order.options"
                  label="Selected Products"
                  hint="Selected Products included in this order"
                  multiple
                  emit-value
                  map-options
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                      v-bind="itemProps"
                      v-on="itemEvents"
                      disable
                    >
                      <q-item-section>
                        <q-item-label disable v-html="opt.label" ></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-toggle disable :value="selected" @input="toggleOption(opt)" />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

              </q-form>

            </q-card-section>
            <q-inner-loading :showing="modals.quick_view_order.loading">
              <q-spinner-ios size="3.5em" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>
        <!-- EDIT ORDER MODAL-->
        <q-dialog v-model="modals.edit_order.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="row items-center bg-grey-3">
              <div class="text-h6 text-primary">Edit Order</div>
              <q-space/>
              <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
              <q-form @submit.prevent="updateOrder" class="q-gutter-md">
                <q-input
                  outlined
                  type="text"
                  v-model="modals.edit_order.order_number"
                  label="Order Number"
                  hint="System Generated Order Number"
                />

                <!--              <q-badge color="primary" multi-line>-->
                <!--                Product IDs: "{{ modals.edit_order.product_ids }}"-->
                <!--              </q-badge>-->

                <q-select
                  filled
                  v-model="modals.edit_order.product_ids"
                  :options="modals.edit_order.options"
                  label="Selected Products"
                  hint="Selected Products included in this order"
                  multiple
                  emit-value
                  map-options
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                      v-bind="itemProps"
                      v-on="itemEvents"
                    >
                      <q-item-section>
                        <q-item-label  v-html="opt.label" ></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-toggle  :value="selected" @input="toggleOption(opt)" />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <div class="q-py-md">
                  <q-btn
                    unelevated
                    no-caps
                    type="submit"
                    color="primary"
                  >Update
                  </q-btn>
                </div>
              </q-form>
            </q-card-section>
            <q-inner-loading :showing="modals.edit_order.loading">
              <q-spinner-ios size="3.5em" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>

        <!--  REMOVE ORDER MODAL -->
        <q-dialog v-model="modals.remove_order.open">
          <q-card style="width: 420px; max-width: 80vw;">
            <q-card-section class="column items-start">
              <div class="text-h6 text-secondary q-mb-md">Remove from Orders List</div>
              <p class="text-primary text-bold q-mb-none text-h6">{{ modals.remove_order.order_number }}</p>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form ref="form" @submit="removeOrder" class="q-gutter-md">
                <q-input
                  readonly
                  outlined
                  type="text"
                  v-model="modals.remove_order.order_number"
                  label="Lower limit"
                  hint="Lower limit"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <p class="text-primary text-bold q-mb-none text-center">
                  Confirm removal of {{ modals.remove_order.order_number }} from your Orders
                </p>
              </q-form>
              <q-btn
                no-caps
                color="primary"
                class="full-width q-mt-md"
                type="submit"
                @click="$refs['form'].submit()"
              >
                Confirm
              </q-btn>
            </q-card-section>
            <q-inner-loading :showing="modals.remove_order.loading">
              <q-spinner-ios size="40px" color="primary"/>
            </q-inner-loading>
          </q-card>
        </q-dialog>
      </q-card>


    </q-card-section>

    <q-tabs v-model="tab" class="text-primary" v-if="supplier">
      <q-tab label="Orders Overview" no-caps name="orders"/>
      <q-tab label="Supplier Products" no-caps name="products"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels v-model="tab" animated v-if="supplier">
      <q-tab-panel name="orders">
        <price-volume
          v-if="charts.price_volume.loaded"
          :data="charts.price_volume.data"
          :options="charts.price_volume.options"
        ></price-volume>

        <q-list class="" style="max-width: 600px">
          <q-item-label header class="text-h6 q-mt-md">Orders Overview</q-item-label>
          <q-separator/>
        </q-list>

        <q-separator/>

        <q-card-section>
          <q-table
            :data="orders_table.data"
            :columns="orders_table.columns"
            row-key="name"
            separator="cell"
            :loading="orders_table.loading"
            flat
          >
            <template v-slot:header-cell="props">
              <q-th :props="props" class="bg-primary text-white">
                {{ props.col.label }}
              </q-th>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="order_number" :props="props">
                  {{ props.row.order_number }}
                </q-td>
                <q-td key="products" :props="props">
                  {{ props.row.products_count }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn
                    outline
                    color="secondary"
                    label="View"
                    size="sm"
                    class="q-mr-sm"
                    @click="quickView(props)"
                  />

                  <q-btn
                    outline
                    color="warning"
                    label="Edit"
                    size="sm"
                    @click="editOrder(props)"
                  />

                  <q-btn
                    outline
                    color="red"
                    label="Delete"
                    size="sm"
                    class="q-ml-sm"
                    @click="remove_order(props)"
                  />

                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>

      </q-tab-panel>

      <q-tab-panel name="products" >
        <div class="text-h5 text-primary text-bold">Supplier Products</div>
        <!-- PRODUCTS TABLE -->
        <q-card-section>
          <q-table
            :data="table.data"
            :columns="table.columns"
            row-key="name"
            separator="cell"
            :loading="table.loading"
            flat
          >
            <template v-slot:header-cell="props">
              <q-th :props="props" class="bg-primary text-white">
                {{ props.col.label }}
              </q-th>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="quantity" :props="props">
                  {{ props.row.quantity }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="updated_at" :props="props">
                  {{ props.row.updated_at }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn
                    outline
                    color="warning"
                    label="Edit"
                    size="sm"
                    @click="editProduct(props)"
                  />

                  <q-btn
                    outline
                    color="red"
                    label="Remove"
                    size="sm"
                    class="q-ml-sm"
                    @click="remove(props)"
                  />

                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-tab-panel>
    </q-tab-panels>
    <q-inner-loading :showing="loading">
      <q-spinner-ios size="3.5em" color="primary"/>
    </q-inner-loading>
  </q-card>
</template>

<script>
  import {defaultMixin} from '../../../mixins/mixins'
  import PriceVolume from "../charts/PriceVolume"
  import {colors} from 'quasar'
  import {notifySuccess, notifyWarning} from "../../../my-helpers/helper";

  export default {
    name: 'Supplier',
    mixins: [defaultMixin],
    components: {PriceVolume},
    data() {
      return {
        supplier: null,
        modals: {
          add_product: {
            open: false,
            loading: false,
            name: null,
            description: null,
            quantity: null
          },
          edit_product: {
            open: false,
            loading: false,
            name: null,
            description: null,
            quantity: null
          },
          remove_product: {
            open: false,
            loading: false,
            name: null,
            description: null,
            quantity: null
          },
          //orders
          quick_view_order: {
            open: false,
            order_number: null,
            loading: true,
            product_ids: [],
            options: [],
          },
          edit_order: {
            id: null,
            open: false,
            order_number: null,
            loading: true,
            product_ids: [],
            options: [],
          },
          remove_order: {
            id: null,
            open: false,
            order_number: null,
            loading: false,
            product_ids: [],
            options: [],
          }
        },
        loading: true,
        tab: 'orders',
        charts: {
          price_volume: {
            loaded: false,
            data: {
              labels: [],
              datasets: [
                {
                  label: 'Orders',
                  fill: true,
                  borderColor: colors.getBrand('primary'),
                  backgroundColor: "rgb(28, 117, 188, 0.5)",
                  lineTension: 0.3,
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "rgba(219,141,13, 0.8)",
                  pointRadius: 5,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(219,141,13, 0.8)",
                  pointHitRadius: 20,
                  pointBorderWidth: 2,
                  data: []
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          }
        },
        table: {
          columns: [
            {name: 'id', align: 'left', label: '#', field: 'id', sortable: true},
            {name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true},
            {name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true},
            {name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity', sortable: true},
            {name: 'created_at', align: 'left', label: 'Date Created', field: 'created_at', sortable: false},
            {name: 'updated_at', align: 'left', label: 'Date Updated', field: 'updated_at', sortable: false},
            {name: 'actions', align: 'left', label: '', field: 'actions', sortable: false},
          ],
          data: [],
          toggle: false,
          loading: false
        },
        orders_table: {
          columns: [
            {name: 'id', align: 'left', label: '#', field: 'id', sortable: false},
            {name: 'order_number', align: 'left', label: 'Order Number', field: 'order_number', sortable: false},
            {name: 'products', align: 'left', label: 'Products', field: 'products', sortable: false},
            {name: 'created_at', align: 'left', label: 'Date Created', field: 'created_at', sortable: false},
            {name: 'actions', align: 'left', label: '', field: 'actions', sortable: false},
            ],
          data: [],
          toggle: false,
          loading: false
        },
      }
    },
    created() {
      this.getSupplier()
    },
    methods: {
      product() {
        this.modals.add_product.open = true
        this.modals.add_product.supplier_id = this.supplier.supplier.id
      },
      editProduct(props) {
        this.modals.edit_product.open = true
        this.modals.edit_product.supplier_id = this.supplier.supplier.id
        this.modals.edit_product.id = props.row.id
        this.modals.edit_product.name = props.row.name
        this.modals.edit_product.description = props.row.description
        this.modals.edit_product.quantity = props.row.quantity
      },
      addProduct() {
        this.modals.add_product.loading = true
        console.log(this.modals.add_product)
        this.$axios.post('/products', this.modals.add_product)
          .then(resp => {
            notifySuccess(resp.data.message)
            this.modals.add_product.name = null
            this.modals.add_product.description = null
            this.modals.add_product.quantity = null
            this.getSupplierProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.add_product.loading = false
            this.modals.add_product.open = false
          })
      },
      updateProduct() {
        this.modals.edit_product.loading = true
        this.$axios.put('/products/'+this.modals.edit_product.id, this.modals.edit_product)
          .then(resp => {
            notifySuccess(resp.data.message)
            this.modals.edit_product.name = null
            this.modals.edit_product.description = null
            this.modals.edit_product.quantity = null
            this.getSupplierProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.edit_product.loading = false
            this.modals.edit_product.open = false
          })
      },
      getSupplier() {
        this.$axios.get('/suppliers/'+this.$route.params.id)
          .then(resp => {
            this.supplier = resp.data.message
            this.getSupplierProducts()
            this.getOrders()
            this.getOrdersChart()
          })
          .finally(() => {
            this.loading = false
          })
      },
      getSupplierProducts() {
        this.table.loading = true
        this.$axios.get('/supplier-products/'+this.supplier.supplier.id)
          .then(resp => {
            console.log(resp)
            this.table.data = []
            this.table.data = resp.data.message.products.map((products) => {
              return {
                id: products.id,
                name: products.name,
                description: products.description,
                quantity: products.quantity,
                created_at: products.created_at,
                updated_at: products.updated_at,
              }
            })
          })
          .finally(() => {
            this.table.loading = false
          })
      },
      remove(props) {
        this.modals.remove_product.open = true
        this.modals.remove_product.id = props.row.id
        this.modals.remove_product.name = props.row.name
        this.modals.remove_product.description = props.row.description
        this.modals.remove_product.quantity = props.row.quantity
      },
      removeProduct() {
        this.modals.remove_product.loading = true
        this.$axios.delete('/products/'+this.modals.remove_product.id)
          .then(resp => {
            notifySuccess( 'Successfully Removed '+ this.modals.remove_product.name + ' from Products List')
            this.getSupplierProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.remove_product.loading = false
            this.modals.remove_product.open = false
          })
      },
      //orders
      quickView(props) {
        this.modals.quick_view_order.open = true
        this.$axios.get('/orders/'+props.row.id)
          .then(resp => {
            this.modals.quick_view_order.order_number = resp.data.message.order.order_number
            this.modals.quick_view_order.options = resp.data.message.order.products.map((products) => { return { value: products.id, label: products.name,}})
            this.modals.quick_view_order.product_ids = resp.data.message.product_ids
          })
          .finally(() => {
            this.modals.quick_view_order.loading = false
          })
      },
      fetchProducts(){
        this.$axios.get('/create-order-products')
          .then(resp => {
            this.modals.add_order.options = resp.data.message.products.map((products) => {
              return {
                value: products.id,
                label: products.name,
              }
            })
          }).catch(error => {
          notifyWarning('Something went wrong')
        }).finally(() => {
          this.modals.add_order.loading = false;
        })
      },
      getOrders(){
        this.orders_table.loading = true
        this.$axios.get('/supplier-orders/'+this.supplier.supplier.id)
          .then(resp => {
            this.orders_table.data = []
            this.orders_table.data = resp.data.message.orders.map((orders) => {
              return {
                id: orders.id,
                order_number: orders.order_number,
                products_count: orders.products_count,
                created_at: orders.created_at,
                updated_at: orders.updated_at,
              }
            })
          })
          .finally(() => {
            this.table.loading = false
          })
      },
      editOrder(props) {
        this.modals.edit_order.open = true
        this.$axios.get('/orders/'+props.row.id)
          .then(resp => {
            this.modals.edit_order.id = props.row.id
            this.modals.edit_order.order_number = props.row.order_number
            this.modals.edit_order.product_ids = resp.data.message.product_ids
          })

        this.$axios.get('/create-order-products')
          .then(resp => {
            this.modals.edit_order.options = resp.data.message.products.map((products) => {
              return {
                value: products.id,
                label: products.name,
              }
            })
          }).finally(() => {
          this.modals.edit_order.loading = false;
        })
      },
      updateOrder(){
        this.modals.edit_order.loading = true
        this.$axios.put('/orders/'+this.modals.edit_order.id, this.modals.edit_order)
          .then(resp => {
            notifySuccess(resp.data.message)
            this.getOrders()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.edit_order.loading = false
            this.modals.edit_order.open = false
          })
      },
      remove_order(props) {
        this.modals.remove_order.open = true
        this.modals.remove_order.id = props.row.id
        this.modals.remove_order.order_number = props.row.order_number
      },
      removeOrder() {
        this.modals.remove_order.loading = true
        this.$axios.delete('/orders/'+this.modals.remove_order.id)
          .then(resp => {
            notifySuccess( 'Successfully Removed '+ this.modals.remove_order.order_number + ' from your Orders List')
            this.getOrders()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.remove_order.loading = false
            this.modals.remove_order.open = false
          })
      },
      getOrdersChart() {
        this.$axios.get('/supplier-orders-chart/'+this.supplier.supplier.id)
          .then(resp => {
            console.log(resp)
            this.charts.price_volume.loaded = true
            this.charts.price_volume.data.datasets[0].data = resp.data.order_count_data // [38, 18, 38, 11, 8, 88, 138, 31, 1, 0, 42, 52, 97, 89];
            this.charts.price_volume.data.labels = resp.data.month //['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
          })
          .finally(() => {
            this.loading = false
          })
      },
    }
  }
</script>

<style scoped>

</style>

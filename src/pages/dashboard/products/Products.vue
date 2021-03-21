<template>
  <section>
    <q-card flat>
      <q-card-section class="row justify-start q-pb-none">
        <div class="text-h6">Products List</div>
        <q-btn @click="product" class="q-ml-lg" size="sm" outline color="primary" label="Add New Product"/>

      </q-card-section>
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
              <q-td key="supplier" :props="props">
                {{ props.row.supplier }}
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
                  label="Delete"
                  size="sm"
                  class="q-ml-sm"
                  @click="remove(props)"
                />

              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <!--    MODALS-->
      <!-- ADD PRODUCT -->
      <q-dialog v-model="modals.add_product.open">
        <q-card style="width: 420px; max-width: 80vw;">
          <q-card-section class="column items-start">
            <div class="text-h6 text-secondary q-mb-md">Add Product
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form ref="form" @submit="addProduct" class="q-gutter-md">
              <q-select
                filled
                v-model="modals.add_product.model"
                :options="modals.add_product.options"
                stack-label
                label="Select Product Supplier"
                hint="Product Supplier"
                color="secondary"
              >
                <template v-slot:selected-item="scope">
                  <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="white"
                    text-color="secondary"
                    class="q-ma-none"
                  >
                    <q-avatar color="primary" text-color="white" :icon="scope.opt.icon" />
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>


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
            <div class="text-h6 text-secondary q-mb-md">Edit Product Details</div>
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
                Confirm removal of {{ modals.remove_product.name }}
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

    </q-card>
  </section>
</template>

<script>
  import {notifySuccess, notifyWarning} from "../../../my-helpers/helper";
  import {defaultMixin} from "../../../mixins/mixins";
  import PriceVolume from "../charts/PriceVolume";
  import {colors} from "quasar";

  export default {
    name: 'Products',
    mixins: [defaultMixin],
    components: {PriceVolume},
    data() {
      return {
        table: {
          columns: [
            {name: 'id', align: 'left', label: '#', field: 'id', sortable: true},
            {name: 'supplier', align: 'left', label: 'Supplier', field: 'supplier', sortable: true},
            {name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true},
            {name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true},
            {name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity', sortable: true},
            {name: 'created_at', align: 'left', label: 'Date Created', field: 'created_at', sortable: false},
            {name: 'updated_at', align: 'left', label: 'Last Updated', field: 'updated_at', sortable: false},
            {name: 'actions', align: 'left', label: '', field: 'actions', sortable: false},
          ],
          data: [],
          toggle: false,
          loading: false
        },
        modals: {
          add_product: {
            model: null,
            options: [],
            open: false,
            loading: true,
            supplier_id: null,
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
        },
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      product() {
        this.modals.add_product.open = true
        this.getSuppliers()
      },
      addProduct() {
        if (this.modals.add_product.model === null){
          this.modals.add_product.loading = false
          notifyWarning('Kindly select a Supplier')
        }
        this.modals.add_product.loading = true
        this.$axios.post('/products', {
          name:this.modals.add_product.name,
          description:this.modals.add_product.description,
          quantity:this.modals.add_product.quantity,
          supplier_id:this.modals.add_product.model.value,
        })
          .then(resp => {
            notifySuccess(resp.data.message)
            this.modals.add_product.name = null
            this.modals.add_product.description = null
            this.modals.add_product.quantity = null
            this.modals.add_product.model = null
            this.getProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.add_product.loading = false
            this.modals.add_product.open = false
          })
      },
      getSuppliers() {
        this.$axios.get('/suppliers')
          .then(resp => {
            this.modals.add_product.options = resp.data.message.suppliers.map((suppliers) => {
              return {
                value: suppliers.id,
                label: suppliers.name,
                icon: 'golf_course'
              }
            })
          })
          .finally(() => {
            this.modals.add_product.loading = false
          })
      },
      editProduct(props) {
        this.modals.edit_product.open = true
        this.modals.edit_product.supplier_id = props.row.supplier_id
        this.modals.edit_product.id = props.row.id
        this.modals.edit_product.name = props.row.name
        this.modals.edit_product.description = props.row.description
        this.modals.edit_product.quantity = props.row.quantity
      },
      updateProduct() {
        this.modals.edit_product.loading = true
        this.$axios.put('/products/'+this.modals.edit_product.id, this.modals.edit_product)
          .then(resp => {
            notifySuccess(resp.data.message)
            this.modals.edit_product.name = null
            this.modals.edit_product.description = null
            this.modals.edit_product.quantity = null
            this.getProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.edit_product.loading = false
            this.modals.edit_product.open = false
          })
      },
      getProducts() {
        this.table.loading = true
        this.$axios.get('/products')
          .then(resp => {
            console.log(resp)
            this.table.data = []
            this.table.data = resp.data.message.products.map((products) => {
              return {
                id: products.id,
                name: products.name,
                supplier_id: products.suppliers[0].id,
                supplier: products.suppliers[0].name,
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
            this.getProducts()
          })
          .catch(error => {
            notifyWarning(error.data.message)
          })
          .finally(() => {
            this.modals.remove_product.loading = false
            this.modals.remove_product.open = false
          })
      },
    }
  }
</script>

<style scoped>

</style>

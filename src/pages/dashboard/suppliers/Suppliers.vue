<template>
  <q-card flat>
    <q-card-section class="row justify-start q-pb-none">
      <div class="text-h6">Company Suppliers</div>
      <q-btn @click="addSupplier" class="q-ml-lg" size="sm" outline color="primary" label="Add New Supplier"/>
    </q-card-section>
    <!--SUPPLIER TABLE-->
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
            <q-td key="products_count" :props="props">
              {{ props.row.products_count }}
            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                outline
                color="secondary"
                label="Info"
                size="sm"
                class="q-mr-sm"
                :to="{name: 'dashboard.supplier', params: {id: props.row.id}}"
              />

              <q-btn
                outline
                color="warning"
                label="Edit"
                size="sm"
                @click="supplier(props)"
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
    <!--MODALS-->
    <!-- ADD SUPPLIER MODAL-->
    <q-dialog v-model="modals.add_supplier.open">
      <q-card style="width: 420px; max-width: 80vw;">
        <q-card-section class="row items-center bg-grey-3">
          <div>
            <div class="text-h6 text-primary">Create Supplier</div>
          </div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="submitSupplierName" class="q-gutter-md">
            <q-input
              outlined
              type="text"
              v-model="modals.add_supplier.name"
              label="Name *"
              lazy-rules=""
              :rules="[ val => val && val.length > 0 || 'Supplier Name is required please type something']"
            />

            <div class="q-py-md">
              <q-btn
                unelevated
                no-caps
                type="submit"
                color="primary"
              >Submit Supplier Name
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
        <q-inner-loading :showing="modals.add_supplier.loading">
          <q-spinner-ios size="3.5em" color="primary"/>
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <!-- EDIT SUPPLIER -->
    <q-dialog v-model="modals.edit_supplier_name.open">
      <q-card style="width: 420px; max-width: 80vw;">
        <q-card-section class="column items-start">
          <div class="text-h6 text-secondary q-mb-md">Edit Supplier Name</div>
          <p class="text-primary text-bold q-mb-none text-h6">{{ modals.edit_supplier_name.name }}</p>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form ref="form" @submit="editSupplier" class="q-gutter-md">
            <q-input
              outlined
              type="text"
              v-model="modals.edit_supplier_name.name"
              label="Name"
              hint="Supplier Name"
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
           Submit
          </q-btn>
        </q-card-section>
        <q-inner-loading :showing="modals.edit_supplier_name.loading">
          <q-spinner-ios size="40px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <!--  REMOVE SUPPLIER -->
    <q-dialog v-model="modals.remove_supplier.open">
      <q-card style="width: 420px; max-width: 80vw;">
        <q-card-section class="column items-start">
          <div class="text-h6 text-secondary q-mb-md">Remove from Suppliers List</div>
          <p class="text-primary text-bold q-mb-none text-h6">{{ modals.remove_supplier.name }}</p>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form ref="form" @submit="removeSupplier" class="q-gutter-md">
            <q-input
              readonly
              outlined
              type="text"
              v-model="modals.remove_supplier.name"
              label="Supplier Name"
              hint="Supplier Name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <p class="text-primary text-bold q-mb-none text-center">
              Confirm removal of {{ modals.remove_supplier.name }} from your Suppliers
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
        <q-inner-loading :showing="modals.remove_supplier.loading">
          <q-spinner-ios size="40px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import {defaultMixin} from '../../../mixins/mixins'
import {notifySuccess, notifyWarning} from "../../../my-helpers/helper";

export default {
  name: 'Suppliers',
  mixins: [defaultMixin],

  data() {
    return {
      modals: {
        add_supplier: {
          open: false,
          loading: false,
          name: null,
          created_at: null,
          updated_at: null,
        },
        edit_supplier_name: {
          open: false,
          loading: false,
          name: null,
          id: null,
        },
        remove_supplier: {
          open: false,
          loading: false,
          name: null,
          id: null,
        }
      },
      table: {
        columns: [
          {name: 'id', align: 'left', label: '#', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true},
          {name: 'products_count', align: 'left', label: 'Products', field: 'products_count', sortable: false},
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
    this.getSuppliers()
  },

  methods: {
    addSupplier(){
      this.modals.add_supplier.name = null
      this.modals.add_supplier.created_at = null
      this.modals.add_supplier.updated_at = null
      this.modals.add_supplier.open = true
    },
    submitSupplierName() {
      this.modals.add_supplier.loading = true
      this.$axios.post('/suppliers', {
        ...this.modals.add_supplier
      })
        .then(resp => {
          notifySuccess(resp.data.message)
          this.getSuppliers()
        })
        .catch(error => {
          notifyWarning(error.data.message)
        })
        .finally(() => {
          this.modals.add_supplier.loading = false
          this.modals.add_supplier.open = false
        })
    },
    supplier(props) {
      this.modals.edit_supplier_name.open = true
      this.modals.edit_supplier_name.id = props.row.id
      this.modals.edit_supplier_name.name = props.row.name
    },
    remove(props) {
      this.modals.remove_supplier.open = true
      this.modals.remove_supplier.id = props.row.id
      this.modals.remove_supplier.name = props.row.name
    },
    editSupplier() {
      this.modals.edit_supplier_name.loading = true
      this.$axios.put('/suppliers/'+this.modals.edit_supplier_name.id, this.modals.edit_supplier_name)
        .then(resp => {
          notifySuccess('Supplier Name Edited Successfully')
          this.getSuppliers()
        })
        .catch(error => {
          notifyWarning(error.data.message)
        })
        .finally(() => {
          this.modals.edit_supplier_name.loading = false
          this.modals.edit_supplier_name.open = false
        })
    },
    removeSupplier() {
      this.modals.remove_supplier.loading = true
      this.$axios.delete('/suppliers/'+this.modals.remove_supplier.id)
        .then(resp => {
          notifySuccess( 'Successfully Removed '+ this.modals.remove_supplier.name + ' from your Suppliers List')
          this.getSuppliers()
        })
        .catch(error => {
          notifyWarning(error.data.message)
        })
        .finally(() => {
          this.modals.remove_supplier.loading = false
          this.modals.remove_supplier.open = false
        })
    },
    getSuppliers() {
      this.table.loading = true
      this.$axios.get('/suppliers')
        .then(resp => {
          console.log(resp)
          this.table.data = []
          this.table.data = resp.data.message.suppliers.map((suppliers) => {
            return {
              id: suppliers.id,
              name: suppliers.name,
              products_count: suppliers.products_count,
              created_at: suppliers.created_at,
              updated_at: suppliers.updated_at,
            }
          })
        })
        .finally(() => {
          this.table.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>

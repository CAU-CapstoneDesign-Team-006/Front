<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <dashboard-table title="Dashboard"></dashboard-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import DashboardTable from './Tables/DashboardTable'
  export default {
    name: 'table',
    components: { 
      DashboardTable
    }
  };
</script>
<style></style>
<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <communication-table title="Communication"></communication-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import CommunicationTable from './Tables/CommunicationTable'
  export default {
    name: 'table',
    components: { 
      CommunicationTable
    }
  };
</script>
<style></style>
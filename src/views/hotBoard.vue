<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <hot-board-table title="hotBoard"></hot-board-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import hotBoardTable from './Tables/hotBoardTable'
  export default {
    name: 'table',
    components: { 
      hotBoardTable
    }
  };
</script>
<style></style>